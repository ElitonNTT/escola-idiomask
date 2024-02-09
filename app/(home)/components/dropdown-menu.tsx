"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";

type DropdownMenuCoursesProps = {
  courses?: Course[];
};

export function DropdownMenuCourses({ courses }: DropdownMenuCoursesProps) {
  //Isso não está bom => refatorar.
  const router = useRouter();

  if (!courses) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FaAlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Cursos disponiveis</DropdownMenuLabel>
        <DropdownMenuGroup>
          {courses.map((course) => (
            <DropdownMenuItem key={course.slug}>
              <Button
                onClick={() => router.push(`/cursos/${course.slug}`)}
                variant="ghost"
                className="flex-grow"
              >
                {course.title}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
