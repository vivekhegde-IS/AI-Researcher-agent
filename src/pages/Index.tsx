import { SearchBar } from '@/components/SearchBar';
import { PapersPanel } from '@/components/PapersPanel';
import { SynthesisPanel } from '@/components/SynthesisPanel';
import { PipelineStatus } from '@/components/PipelineStatus';
import { useResearch } from '@/hooks/use-research';

const Index = () => {
  const { query, result, isLoading, error, startResearch, generateSynthesis } = useResearch();

  const hasResults = result?.status === 'completed' && result.papers?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Search state */}
      {!hasResults && !isLoading && (
        <div className="flex items-center justify-center min-h-screen px-6">
          <SearchBar onSearch={startResearch} isLoading={isLoading} />
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <SearchBar onSearch={startResearch} isLoading={isLoading} />
          <PipelineStatus status={result?.status || 'running'} />
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <SearchBar onSearch={startResearch} isLoading={false} />
          <div className="mt-6 bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm text-destructive max-w-md text-center">
            {error}. Please check your backend is running and try again.
          </div>
        </div>
      )}

      {/* Results: split layout */}
      {hasResults && (
        <div className="flex h-screen">
          {/* Left: Papers (30%) */}
          <div className="w-[30%] border-r border-border bg-card overflow-hidden flex flex-col">
            <PapersPanel papers={result.papers} query={query} />
          </div>

          {/* Right: Synthesis (70%) */}
          <div className="w-[70%] bg-background overflow-hidden flex flex-col">
            <SynthesisPanel result={result} onGenerateSynthesis={generateSynthesis} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
