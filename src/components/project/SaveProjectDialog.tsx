'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Save, Loader2, CheckCircle } from 'lucide-react';

interface SaveProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultName: string;
  isSaving: boolean;
  onSave: (displayName: string) => Promise<void>;
}

export function SaveProjectDialog({
  open,
  onOpenChange,
  defaultName,
  isSaving,
  onSave,
}: SaveProjectDialogProps) {
  const [displayName, setDisplayName] = useState(defaultName);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await onSave(displayName.trim() || defaultName);
      setSaved(true);
      setTimeout(() => {
        onOpenChange(false);
        setSaved(false);
      }, 1500);
    } catch {
      // Error handled by parent
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSaving) {
      onOpenChange(newOpen);
      if (newOpen) {
        setDisplayName(defaultName);
        setSaved(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로젝트 저장</DialogTitle>
          <DialogDescription>
            생성된 상세페이지를 저장합니다. 나중에 다시 불러올 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        {saved ? (
          <div className="flex flex-col items-center py-6 gap-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-sm font-medium">저장되었습니다!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">프로젝트 이름</Label>
                <Input
                  id="project-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="프로젝트 이름을 입력하세요"
                  disabled={isSaving}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isSaving}>
                취소
              </Button>
              <Button onClick={handleSave} disabled={isSaving || !displayName.trim()}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    저장
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
