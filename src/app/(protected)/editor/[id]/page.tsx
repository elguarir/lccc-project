import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ArticleEditor from "@/components/editor/ArticleEditor";
import SideBar from "@/components/editor/SideBar";

interface EditorPageProps {
	params: {
		id: string;
	};
}
const EditorPage = ({ params }: EditorPageProps) => {
	return (
		<div className="relative flex flex-1 w-full h-screen">
			<ScrollArea className="w-full h-screen">
				<ScrollBar orientation="vertical" />

				<div className="container flex flex-col w-full h-screen py-8 max-sm:px-3">
					<header className="flex items-center justify-between w-full">
						<div className="flex items-center gap-4">
							<Button
								asChild
								variant={"ghost"}
								className="font-medium"
								size={"sm"}
							>
								<Link href={"/dashboard"}>
									<ChevronLeft className="mr-2" size={16} />
									Back
								</Link>
							</Button>
							<span className="text-sm font-medium text-muted-foreground">
								Published
							</span>
						</div>
					</header>
					<main className="flex flex-col flex-1 w-full h-full max-w-4xl py-6 mx-auto lg:py-16 lg:px-4">
						<ArticleEditor />
					</main>
				</div>
			</ScrollArea>
			<SideBar />
		</div>
	);
};

export default EditorPage;
