import { Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResearchPaper } from '@/lib/api/research';

interface PapersPanelProps {
  papers: ResearchPaper[];
  query: string;
}

export function PapersPanel({ papers, query }: PapersPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-bold font-heading text-foreground mb-1">Research Papers</h2>
        <p className="text-xs text-muted-foreground">
          Click a paper to view details in the summary panel
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{papers.length} found</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
            {query}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {papers.map((paper, idx) => (
          <div
            key={idx}
            className="bg-card rounded-lg border border-border p-4 shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.05}s`, opacity: 0 }}
          >
            <h3 className="text-sm font-semibold font-heading text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5">
              {paper.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              {paper.authors} · {paper.year} · <span className="text-accent font-medium">{paper.source}</span>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {paper.abstract}
            </p>
            {paper.url && (
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 h-8 text-xs text-primary hover:text-primary font-medium gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Paper
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
