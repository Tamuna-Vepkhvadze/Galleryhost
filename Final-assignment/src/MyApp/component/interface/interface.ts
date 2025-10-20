export interface Photo {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string | null;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    portfolio_url: string | null;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
  };


  views?: number;
  downloads?: number;

  tags?: {
    type?: string;
    title: string;
    source?: {
      ancestry?: {
        type?: { slug: string; pretty_slug: string };
        category?: { slug: string; pretty_slug: string };
        subcategory?: { slug: string; pretty_slug: string };
      };
      title?: string;
      subtitle?: string;
      description?: string;
      meta_title?: string;
      meta_description?: string;
    };
  }[];
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  provider?: string;
}