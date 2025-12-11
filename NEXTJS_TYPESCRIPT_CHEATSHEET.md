# Next.js + TypeScript Complete Cheat Sheet

## Table of Contents
1. [Project Setup](#project-setup)
2. [File Structure & Conventions](#file-structure--conventions)
3. [Core Concepts](#core-concepts)
4. [Working with Components](#working-with-components)
5. [Routing & Pages](#routing--pages)
6. [Forms & State Management](#forms--state-management)
7. [API Routes](#api-routes)
8. [Data Fetching](#data-fetching)
9. [TypeScript Essentials](#typescript-essentials)
10. [Common Patterns](#common-patterns)

---

## Project Setup

### Creating a New Next.js Project
```bash
npx create-next-app@latest project-name --typescript
# During setup, say YES to:
# - TypeScript
# - ESLint
# - Tailwind CSS (optional but useful)
```

### What Gets Created
```
project-name/
├── app/              # App router (modern way - Next.js 13+)
├── public/           # Static files (images, etc.)
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript config
├── next.config.ts    # Next.js config
└── README.md
```

### Key Files to Know
- `package.json`: Lists all dependencies and scripts
- `tsconfig.json`: TypeScript configuration (usually don't touch this)
- `next.config.ts`: Next.js specific settings
- `.eslintrc.json`: Code quality rules

---

## File Structure & Conventions

### The App Router Structure (Modern Next.js)

```
app/
├── layout.tsx           # Wraps ALL pages (Navbar, sidebars here)
├── page.tsx             # Home page (/)
├── globals.css          # Global styles
├── _components/         # Shared components (underscore = not a route)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Category.tsx
│   └── Blogs.tsx
├── blogs/               # This creates /blogs route
│   ├── page.tsx         # /blogs page (list all blogs)
│   └── [blogId]/        # Dynamic route - [brackets] = dynamic
│       └── page.tsx     # /blogs/1, /blogs/2, etc.
└── api/                 # API routes (backend endpoints)
    └── blogs/
        └── route.ts     # /api/blogs endpoint
```

### Naming Conventions
- **Folders with `_` prefix**: Not routes (e.g., `_components`, `_utils`)
- **`[param]` folders**: Dynamic route segments
- **`layout.tsx`**: Wraps child pages
- **`page.tsx`**: The actual page content
- **`route.ts`**: API endpoint file

---

## Core Concepts

### 1. Server vs Client Components

**Server Component (Default)**
```typescript
// No "use client" = runs on server
// Can access databases, APIs, secrets
// Cannot use hooks (useState, useEffect)

export default function Page() {
  // This runs on the server
  return <div>Server rendered</div>;
}
```

**Client Component**
```typescript
"use client";  // This marks it as client component

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);  // Can use hooks here
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Why This Matters:**
- Server components: Better performance, can access DB
- Client components: Need for interactivity (forms, clicks, state)

### 2. Routing Basics

In Next.js (app router), **the file structure IS your routes:**

```
app/page.tsx              → /
app/blogs/page.tsx        → /blogs
app/blogs/[id]/page.tsx   → /blogs/123 (dynamic)
app/api/blogs/route.ts    → /api/blogs (backend endpoint)
```

**No need to configure routes manually!**

### 3. The Layout System

```typescript
// app/layout.tsx (wraps EVERY page)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />        {/* Shows on every page */}
        {children}        {/* The actual page content */}
      </body>
    </html>
  );
}
```

`children` is a reserved prop that holds the page content.

---

## Working with Components

### Component Types

**1. Functional Component (Most Common)**
```typescript
// app/_components/BlogCard.tsx
interface BlogCardProps {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
}

export default function BlogCard({ id, title, summary, imageUrl }: BlogCardProps) {
  return (
    <div className="bg-white p-4">
      <h2>{title}</h2>
      <p>{summary}</p>
    </div>
  );
}
```

**2. Passing Data to Components**
```typescript
// Parent component
const blog = { id: 1, title: "Hello", summary: "World", imageUrl: "..." };

<BlogCard {...blog} />  // Spread operator passes all props
// OR
<BlogCard id={blog.id} title={blog.title} ... />  // Explicit passing
```

### TypeScript with Components

**Why Interface/Type?**
- Catches errors at development time
- Auto-complete in editor
- Self-documenting code

```typescript
// Define the shape of your data
interface Blog {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
}

// Use it in component
interface BlogListProps {
  blogs: Blog[];  // Array of blogs
}

export default function BlogList({ blogs }: BlogListProps) {
  return blogs.map(blog => (
    <BlogCard key={blog.id} {...blog} />
  ));
}
```

---

## Routing & Pages

### Dynamic Routes (Like Your Blog Pages)

Your structure:
```
app/blogs/[blogId]/page.tsx
```

This means:
- `/blogs/1` → `blogId = "1"`
- `/blogs/abc` → `blogId = "abc"`

**Accessing the Dynamic Parameter:**
```typescript
// app/blogs/[blogId]/page.tsx

interface PageProps {
  params: {
    blogId: string;  // The [blogId] value
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { blogId } = await params;
  
  return <div>Blog ID: {blogId}</div>;
}
```

### Navigation

**Using Next.js Link (Client Side)**
```typescript
import Link from "next/link";

export default function BlogCard() {
  return (
    <Link href={`/blogs/${id}`}>
      Click to view blog
    </Link>
  );
}
```

**Why not `<a>` tag?**
- Next.js Link prefetches pages (faster)
- Better performance
- Client-side navigation (no full page reload)

---

## Forms & State Management

### Client Component Form Example

```typescript
"use client";

import { useState } from "react";

export default function AddBlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    imageUrl: ""
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value  // Update specific field
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page reload
    
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      console.log("Blog added:", result);
      // Reset form or redirect
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Blog title"
      />
      <input
        type="text"
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        placeholder="Summary"
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Add Blog</button>
    </form>
  );
}
```

**Key Points:**
- `"use client"` enables hooks (useState, useEffect)
- `e.preventDefault()` stops form from reloading page
- `handleChange` updates state as user types
- `fetch()` sends data to your backend

### Form State Pattern Explained

```typescript
// Step 1: Create state for form data
const [formData, setFormData] = useState({ title: "", summary: "" });

// Step 2: When input changes, update state
onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//        ^                                    ^
//        Event object                        Spread operator keeps other fields

// Step 3: When form submits, send data to server
onSubmit={(e) => {
  e.preventDefault();  // Don't reload page
  fetch("/api/blogs", { body: JSON.stringify(formData) });
}}
```

---

## API Routes

### Creating Backend Endpoints

**Create this structure:**
```
app/
└── api/
    └── blogs/
        └── route.ts
```

### Basic API Route

```typescript
// app/api/blogs/route.ts

import { NextRequest, NextResponse } from "next/server";

// GET: Fetch all blogs
export async function GET(request: NextRequest) {
  try {
    // Your logic here
    const blogs = [/* your blogs */];
    return NextResponse.json(blogs);  // Returns JSON response
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();  // Parse the request body
    
    // Validate data
    if (!data.title || !data.summary) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    
    // Save to database (later, for now just return the data)
    const newBlog = {
      id: Date.now(),  // Simple ID generation
      ...data
    };
    
    return NextResponse.json(newBlog, { status: 201 });  // 201 = Created
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### Dynamic API Routes

```
app/
└── api/
    └── blogs/
        ├── route.ts        # /api/blogs
        └── [id]/
            └── route.ts    # /api/blogs/1
```

```typescript
// app/api/blogs/[id]/route.ts

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Get blog with this ID
  return NextResponse.json({ id, title: "Blog" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();
  // Update blog
  return NextResponse.json({ id, ...data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Delete blog
  return NextResponse.json({ message: "Deleted" });
}
```

---

## Data Fetching

### Server Component Data Fetching

```typescript
// app/blogs/page.tsx (Server Component)

async function getBlogs() {
  try {
    const response = await fetch("http://localhost:3000/api/blogs");
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  } catch (error) {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();  // This runs on SERVER
  
  return (
    <div>
      {blogs.map(blog => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
}
```

**Why This Is Great:**
- Fetches happen on server (faster, secure)
- No loading states needed
- Better SEO
- Direct database access possible

### Client Component Data Fetching

```typescript
"use client";

import { useState, useEffect } from "react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  // Runs after component mounts
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);  // Empty array = runs once on mount

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {blogs.map(blog => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
}
```

**When to Use Client vs Server:**
- **Server**: When you can wait (no user interaction needed first)
- **Client**: When you need to refetch based on user actions

---

## TypeScript Essentials

### Basic Types

```typescript
// Primitives
const name: string = "Victor";
const age: number = 25;
const isActive: boolean = true;

// Arrays
const tags: string[] = ["typescript", "nextjs"];
const numbers: Array<number> = [1, 2, 3];

// Objects
interface User {
  id: number;
  name: string;
  email?: string;  // ? means optional
  tags: string[];
}

const user: User = {
  id: 1,
  name: "Victor",
  tags: ["dev"]
  // email is optional, so we can skip it
};

// Union types (can be one of these)
const status: "draft" | "published" | "deleted" = "draft";

// Type from array
const blogs = [{ id: 1, title: "Hi" }];
type Blog = typeof blogs[0];  // Now Blog = { id: number; title: string }
```

### Generics (Reusable Types)

```typescript
// Generic function
function getById<T>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Usage
const blog = getById<Blog>(blogs, 1);
const user = getById<User>(users, 1);

// Generic interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Usage
type BlogResponse = ApiResponse<Blog>;
type UserResponse = ApiResponse<User>;
```

### Utility Types (Time Savers)

```typescript
interface Blog {
  id: number;
  title: string;
  summary: string;
  published: boolean;
}

// Partial: all fields optional
type PartialBlog = Partial<Blog>;  // { id?: number; title?: string; ... }

// Required: all fields required
type RequiredBlog = Required<Blog>;  // All fields mandatory

// Pick: select specific fields
type BlogPreview = Pick<Blog, "id" | "title">;  // { id: number; title: string }

// Omit: exclude specific fields
type BlogDraft = Omit<Blog, "published">;  // Everything except published

// Record: create type from keys
type Status = Record<"draft" | "published" | "deleted", number>;
// { draft: number; published: number; deleted: number }
```

---

## Common Patterns

### Pattern 1: Displaying Lists with Filters

**What's happening:**
1. Get all data from server
2. Store filter selection in state
3. Filter data based on selection
4. Display filtered results

```typescript
"use client";

import { useState } from "react";

export default function BlogsPage({ initialBlogs }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory === "all" 
    ? initialBlogs 
    : initialBlogs.filter(blog => blog.category === selectedCategory);

  return (
    <div>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="tech">Tech</option>
        <option value="life">Life</option>
      </select>

      {filteredBlogs.map(blog => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
}
```

### Pattern 2: Form with API Call

**What's happening:**
1. User types → state updates
2. Form submits → send to API
3. API processes data
4. Success → redirect or show message

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBlogForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", summary: "", imageUrl: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to create blog");

      router.push("/blogs");  // Redirect after success
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Add Blog"}
      </button>
    </form>
  );
}
```

### Pattern 3: Detail Page with Edit/Delete

```typescript
// app/blogs/[blogId]/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { blogId: string };
}

export default function BlogDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [blog, setBlog] = useState(/* fetched blog */);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    await fetch(`/api/blogs/${params.blogId}`, { method: "DELETE" });
    router.push("/blogs");
  };

  const handleUpdate = async (updatedData) => {
    await fetch(`/api/blogs/${params.blogId}`, {
      method: "PUT",
      body: JSON.stringify(updatedData)
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <EditForm blog={blog} onSave={handleUpdate} />
      ) : (
        <>
          <h1>{blog.title}</h1>
          <p>{blog.summary}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}
```

### Pattern 4: Using useRouter for Navigation

```typescript
"use client";

import { useRouter } from "next/navigation";  // Important: "next/navigation" for app router

export default function MyComponent() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/blogs");        // Go to a page
    router.back();                // Go back
    router.refresh();             // Refresh current page
    router.replace("/blogs");     // Go without adding to history
  };

  return <button onClick={handleNavigate}>Navigate</button>;
}
```

**Important:** Import from `"next/navigation"` (not `"next/router"`)

---

## Quick Reference: What You Need for Your Blog

### For Adding Blogs (Form)
1. Create `app/api/blogs/route.ts` (POST endpoint)
2. Create `app/_components/AddBlogForm.tsx` (form component)
3. In form component: `"use client"` → useState → fetch on submit

### For Displaying Single Blog
1. Create `app/blogs/[blogId]/page.tsx`
2. Get `blogId` from `params`
3. Fetch blog data with that ID
4. Display with edit/delete buttons

### For Editing Blog
1. In blog detail page, add PUT endpoint
2. Form component similar to AddBlog
3. Pre-fill form with existing data
4. Send PUT request to `/api/blogs/[id]`

### For Deleting Blog
1. Add DELETE endpoint in `/api/blogs/[id]/route.ts`
2. In detail page, add delete button
3. On click, fetch DELETE request
4. Redirect to blogs list

---

## Debugging Tips

### Common Errors & Solutions

**1. "Cannot find module"**
- Check file path is correct
- Make sure file actually exists
- Import path is case-sensitive on Linux/Mac

**2. "useRouter is undefined"**
- Check you have `"use client"` at top of file
- Import from `"next/navigation"` (not `"next/router"`)

**3. Form doesn't submit**
- Add `e.preventDefault()` in handleSubmit
- Check network tab in DevTools to see if request is sent

**4. State doesn't update**
- Remember: setState is asynchronous
- Don't try to use updated state immediately after setting it

**5. API returns 404**
- Check route file path matches the URL
- API routes must be in `/api` folder
- File must be named `route.ts`

---

## Next Steps to Implement

1. **Form to Add Blogs**
   - Create client component with form
   - Create POST endpoint to save blogs
   - (Start with array in memory, later add database)

2. **Individual Blog Page**
   - Create `[blogId]` dynamic route
   - Fetch specific blog
   - Display full blog content

3. **Edit/Delete**
   - Add PUT endpoint for updates
   - Add DELETE endpoint for removal
   - Add buttons in blog detail page

4. **(Optional) Database**
   - Add Prisma or similar ORM
   - Replace in-memory arrays with database queries

---

## Resources
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)
