CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL CHECK (category IN ('kitchens','interiors','wardrobes','bathrooms')),
  location text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  cover_image_url text NOT NULL DEFAULT '',
  gallery_urls text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update projects" ON public.projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete projects" ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read project images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'project-images');
CREATE POLICY "Admins upload project images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update project images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO public.projects (slug, title, category, location, year, cover_image_url, description, gallery_urls, created_at) VALUES
('bahadurabad-kitchen','Bahadurabad Kitchen','kitchens','Bahadurabad, Karachi','2025','/images/projects/project-1.jpg','A warm, handle-less kitchen with imported soft-close hardware, a seamless quartz island and integrated appliances planned around daily family cooking.',ARRAY['/images/projects/project-1.jpg','/images/projects/detail-chair.jpg','/images/projects/feature-lounge.jpg'], now()),
('dha-family-kitchen','DHA Family Kitchen','kitchens','DHA Phase VI, Karachi','2024','/images/projects/project-5.jpg','Full kitchen renewal with tall pantry storage, concealed lighting and durable matte lacquer finishes.',ARRAY['/images/projects/project-5.jpg','/images/projects/project-1.jpg','/images/projects/about-studio.jpg'], now() - interval '1 minute'),
('adamjee-nagar-lounge','Adamjee Nagar Lounge','interiors','Adamjee Nagar, Karachi','2025','/images/projects/project-2.jpg','A calm lounge anchored by a fluted TV wall with concealed cabling, warm wood panelling and layered lighting.',ARRAY['/images/projects/project-2.jpg','/images/projects/feature-lounge.jpg','/images/projects/hero-living.jpg'], now() - interval '2 minutes'),
('bath-island-full-home','Bath Island Full Home','interiors','Bath Island, Karachi','2023','/images/projects/feature-lounge.jpg','Turnkey execution of a newly built home — living, dining and bedrooms designed, procured and installed by one team.',ARRAY['/images/projects/feature-lounge.jpg','/images/projects/hero-living.jpg','/images/projects/about-studio.jpg'], now() - interval '3 minutes'),
('clifton-wardrobe-suite','Clifton Wardrobe Suite','wardrobes','Clifton, Karachi','2024','/images/projects/project-4.jpg','Floor-to-ceiling wardrobes with intelligent internals, glass display shelving and soft-close motion throughout.',ARRAY['/images/projects/project-4.jpg','/images/projects/detail-chair.jpg','/images/projects/about-studio.jpg'], now() - interval '4 minutes'),
('gulshan-master-closet','Gulshan Master Closet','wardrobes','Gulshan-e-Iqbal, Karachi','2024','/images/projects/about-studio.jpg','A walk-in master closet with island drawers, mirrored panels and quiet linear lighting.',ARRAY['/images/projects/about-studio.jpg','/images/projects/project-4.jpg','/images/projects/detail-chair.jpg'], now() - interval '5 minutes'),
('dha-spa-bathroom','DHA Spa Bathroom','bathrooms','DHA Phase VI, Karachi','2024','/images/projects/project-3.jpg','Stone, brass and soft light combined into a private spa-like bathroom with a frameless walk-in shower.',ARRAY['/images/projects/project-3.jpg','/images/projects/detail-chair.jpg','/images/projects/hero-living.jpg'], now() - interval '6 minutes'),
('pechs-guest-bathroom','PECHS Guest Bathroom','bathrooms','PECHS, Karachi','2023','/images/projects/detail-chair.jpg','A compact guest bathroom made generous with large-format tiles, a floating vanity and premium fittings.',ARRAY['/images/projects/detail-chair.jpg','/images/projects/project-3.jpg','/images/projects/about-studio.jpg'], now() - interval '7 minutes');