import { useState, useEffect, useCallback } from 'react';
import { researchApi, type ResearchResult } from '@/lib/api/research';

export function useResearch() {
  const [query, setQuery] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startResearch = useCallback(async (q: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setQuery(q);
    try {
      const { job_id } = await researchApi.startResearch(q);
      setJobId(job_id);
      setIsPolling(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start research');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPolling || !jobId) return;

    const interval = setInterval(async () => {
      try {
        const data = await researchApi.getStatus(jobId);
        setResult(data);
        if (data.status === 'completed' || data.status === 'failed') {
          setIsPolling(false);
          setIsLoading(false);
          if (data.status === 'failed') {
            setError('Research pipeline failed');
          }
        }
      } catch {
        // Keep polling on transient errors
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPolling, jobId]);

  const generateSynthesis = useCallback(async () => {
    if (!jobId) return;
    try {
      const { synthesis } = await researchApi.generateSynthesis(jobId);
      setResult(prev => prev ? { ...prev, synthesis } : prev);
    } catch (err) {
      setError('Failed to generate synthesis');
    }
  }, [jobId]);

  return {
    query,
    result,
    isLoading,
    error,
    startResearch,
    generateSynthesis,
  };
}
