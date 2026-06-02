-- 고객 게시판: 선택 공개 + 카테고리(후기/일상) (프로젝트: oyamskcpwihrdxcaikly)
UPDATE public.memos
SET category = '일상'
WHERE category NOT IN ('후기', '일상');

ALTER TABLE public.memos DROP CONSTRAINT IF EXISTS memos_category_check;
ALTER TABLE public.memos
  ADD CONSTRAINT memos_category_check
  CHECK (category IN ('후기', '일상'));

ALTER TABLE public.memos
  ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'private'
  CHECK (visibility IN ('private', 'public'));

DROP POLICY IF EXISTS "Users can select own memos" ON public.memos;

CREATE POLICY "Anyone can read public memos"
  ON public.memos FOR SELECT
  TO anon, authenticated
  USING (visibility = 'public');

CREATE POLICY "Authors can read own memos"
  ON public.memos FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

GRANT SELECT ON public.memos TO anon;
