'use client';

import { useState, useCallback } from 'react';
import type { ProjectListItem, Project } from '@/types';

interface UseProjectsReturn {
  projects: ProjectListItem[];
  isLoading: boolean;
  totalCount: number;
  page: number;
  hasMore: boolean;
  fetchProjects: (pageNum?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  deleteProject: (id: string) => Promise<boolean>;
  getProject: (id: string) => Promise<Project | null>;
}

const PAGE_SIZE = 12;

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const fetchProjects = useCallback(async (pageNum: number = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects?page=${pageNum}&limit=${PAGE_SIZE}`);
      if (!res.ok) {
        if (res.status === 401) return;
        throw new Error('Failed to fetch projects');
      }

      const { data, pagination } = await res.json();

      if (pageNum === 1) {
        setProjects(data);
      } else {
        setProjects((prev) => [...prev, ...data]);
      }
      setTotalCount(pagination.total);
      setPage(pageNum);
    } catch (error) {
      console.error('fetchProjects error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    await fetchProjects(page + 1);
  }, [fetchProjects, page]);

  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) return false;

      setProjects((prev) => prev.filter((p) => p.id !== id));
      setTotalCount((prev) => prev - 1);
      return true;
    } catch (error) {
      console.error('deleteProject error:', error);
      return false;
    }
  }, []);

  const getProject = useCallback(async (id: string): Promise<Project | null> => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) return null;

      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('getProject error:', error);
      return null;
    }
  }, []);

  const hasMore = projects.length < totalCount;

  return {
    projects,
    isLoading,
    totalCount,
    page,
    hasMore,
    fetchProjects,
    loadMore,
    deleteProject,
    getProject,
  };
}
