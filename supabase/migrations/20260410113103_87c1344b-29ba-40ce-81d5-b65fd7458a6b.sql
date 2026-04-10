
DROP POLICY "Anyone can create inquiries" ON public.inquiries;
CREATE POLICY "Anyone can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (
  name IS NOT NULL AND length(trim(name)) > 0 AND
  phone IS NOT NULL AND length(trim(phone)) >= 10
);
