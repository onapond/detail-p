'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, FolderOpen, ImageIcon } from 'lucide-react';
import type { ProjectListItem } from '@/types';

interface ProjectListProps {
  projects: ProjectListItem[];
  isLoading: boolean;
  totalCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelect: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

const categoryLabels: Record<string, string> = {
  coffee: '커피',
  health_supplement: '건강기능식품',
  processed_food: '가공식품',
  beverage: '음료',
};

const statusLabels: Record<string, string> = {
  draft: '초안',
  published: '게시됨',
  archived: '보관됨',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return '오늘';
  if (days === 1) return '어제';
  if (days < 7) return `${days}일 전`;
  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

export function ProjectList({
  projects,
  isLoading,
  totalCount,
  hasMore,
  onLoadMore,
  onSelect,
  onDelete,
}: ProjectListProps) {
  if (isLoading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground">저장된 프로젝트가 없습니다.</p>
        <p className="text-sm text-muted-foreground/70 mt-1">
          상세페이지를 생성한 후 저장해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">내 프로젝트 ({totalCount})</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(project.id)}
          >
            <CardContent className="p-4">
              {/* Thumbnail */}
              <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden flex items-center justify-center">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.displayName || project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm truncate">
                  {project.displayName || project.name}
                </h4>

                <div className="flex items-center gap-2">
                  {project.category && (
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[project.category] || project.category}
                    </Badge>
                  )}
                  {project.status && (
                    <Badge variant="outline" className="text-xs">
                      {statusLabels[project.status] || project.status}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(project.updatedAt)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(project.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onLoadMore} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
}
