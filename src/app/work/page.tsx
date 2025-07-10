import Footer from "../../components/Footer";
import ClientProjectGrid from "./ClientProjectGrid";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function WorkPage() {
  // DB/work/配下のmdファイルを全て取得
  const dir = path.join(process.cwd(), "DB/work");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

  // 各mdファイルをパース
  const projects = files.map(filename => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return {
      id: filename.replace(/\.md$/, ""),
      title: data.title ?? "",
      category: data.category ?? "",
      tech: data.tech ?? [],
      size: data.size ?? "1x1",
      color: data.color ?? "from-[#ABBAA9]/20 to-[#ABBAA9]/10",
      content,
    };
  });

  return (
    <div>
      <ClientProjectGrid projects={projects} />
      <Footer />
    </div>
  );
}