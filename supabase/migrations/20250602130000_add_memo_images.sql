-- 메모 사진: image_urls 컬럼 + Storage 버킷 (프로젝트: oyamskcpwihrdxcaikly)
ALTER TABLE public.memos
  ADD COLUMN IF NOT EXISTS image_urls TEXT[] NOT NULL DEFAULT '{}';

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'memo-images',
  'memo-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Users can upload own memo images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view memo images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own memo images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own memo images" ON storage.objects;

CREATE POLICY "Users can upload own memo images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'memo-images'
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );

CREATE POLICY "Anyone can view memo images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'memo-images');

CREATE POLICY "Users can delete own memo images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'memo-images'
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );

CREATE POLICY "Users can update own memo images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'memo-images'
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );
