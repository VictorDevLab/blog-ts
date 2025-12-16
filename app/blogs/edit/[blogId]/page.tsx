'use client';

import AddBlogForm from '@/app/_components/AddBlogForm';
import { useParams } from 'next/navigation';

function EditBlogPage() {
  const params = useParams();
  const blogId = parseInt(params.blogId as string);

  return <AddBlogForm blogId={blogId} />;
}

export default EditBlogPage;
