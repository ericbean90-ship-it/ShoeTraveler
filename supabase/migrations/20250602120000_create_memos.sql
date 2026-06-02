-- 아이 이야기 메모 테이블 (프로젝트: oyamskcpwihrdxcaikly)
CREATE TABLE IF NOT EXISTS public.memos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '일상' CHECK (category IN ('일상', '성장', '건강', '추억', '기타')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS memos_user_id_idx ON public.memos(user_id);
CREATE INDEX IF NOT EXISTS memos_user_id_created_at_idx ON public.memos(user_id, created_at DESC);

ALTER TABLE public.memos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can select own memos" ON public.memos;
DROP POLICY IF EXISTS "Users can insert own memos" ON public.memos;
DROP POLICY IF EXISTS "Users can update own memos" ON public.memos;
DROP POLICY IF EXISTS "Users can delete own memos" ON public.memos;

CREATE POLICY "Users can select own memos"
  ON public.memos FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own memos"
  ON public.memos FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own memos"
  ON public.memos FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own memos"
  ON public.memos FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.memos TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_memos_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = pg_catalog.now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS memos_updated_at ON public.memos;
CREATE TRIGGER memos_updated_at
  BEFORE UPDATE ON public.memos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_memos_updated_at();
