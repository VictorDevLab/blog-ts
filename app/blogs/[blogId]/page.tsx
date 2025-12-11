
interface pageProps {
  params: {
    blogId: number | string;
  }
}
async function page({params}: pageProps) {
  const { blogId } = await params
  console.log("params", blogId)
  return (
    <div> Blog Zaza<p className="text-red-600">{blogId}</p></div>
  )
}
  
export default page