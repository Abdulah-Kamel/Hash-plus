import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Sparkle, X, Paperclip, Mic} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import CommentInput from "@/components/course-page/CommentInput";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import MessageInput from "@/components/AI/MessageInput";

const AiDialog = () => {
    return (
        <Dialog dir={"rtl"}>
            <DialogTrigger asChild>
                <button
                    className="text-secondary cursor-pointer flex items-center gap-1.5 px-2 sm:px-3 py-1.5 border border-secondary hover:bg-secondary/10 rounded-lg duration-200">
                    <Sparkle/>
                    اسال ال AI
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80%] w-full rounded-3xl p-0 flex flex-col" showCloseButton={false}>
                {/* Header spanning both sections */}
                <DialogHeader
                    className="border-b border-gray-200 w-full p-4 flex flex-row justify-between items-center">
                    <DialogTitle className="text-start">اسال ال AI</DialogTitle>
                    <DialogClose className="text-muted-foreground cursor-pointer p-2">
                        <X className="size-7"/>
                    </DialogClose>
                </DialogHeader>
                
                {/* Main content area with chat and sidebar */}
                <div className="grid grid-cols-4">
                    {/* Right Chat Area */}
                    <div className="col-span-full lg:col-span-3 flex flex-col">

                    <div className="flex-grow p-6 space-y-6 overflow-y-auto max-lg:max-h-[500px]">
                        {/* AI Message */}
                        <div className="flex items-start gap-3 justify-start">
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gray-200 text-sm">SL</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 p-3 rounded-lg max-w-2xl">
                                <p className="text-sm">Hello! I'm your personal AI Assistant Slothpilot.</p>
                                <span className="text-xs text-muted-foreground block text-left mt-1">10:25 ✓</span>
                            </div>
                        </div>

                        {/* User Message */}
                        <div className="flex items-start gap-3 justify-end">
                            <div className="bg-primary text-white p-3 rounded-lg max-w-md">
                                <p className="text-sm">أريد تلخيص لهذا المحاضرة</p>
                                <span className="text-xs text-primary-foreground/70 block text-left mt-1">11:25 ✓</span>
                            </div>
                            <Avatar className="w-10 h-10">
                                <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* AI Long Message */}
                        <div className="flex items-start gap-3 justify-start">
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gray-200 text-sm">SL</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 p-4 rounded-lg max-w-2xl space-y-2">
                                <p className="text-sm">Do Androis Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco, the story unfolds after a devastating global war.</p>
                                <ol className="list-decimal list-inside text-sm space-y-1">
                                    <li><b>Androis and Humans</b>: The novel explores the uneasy coexistence of humans and androids. Androids, manufactured on Mars, rebel, kill their owners, and escape to Earth, where they hope to remain undetected.</li>
                                    <li><b>Empathy and Identity</b>: To distinguish androids from humans, the Voight-Kampff test measures emotional responses. Androids lack empathy, making them vulnerable to detection.</li>
                                    <li><b>Status Symbols</b>: Owning real animals is a status symbol due to mass extinctions. Poor people resort to realistic electric robotic imitations of live animals, concealing their true nature from neighbors.</li>
                                </ol>
                                <span className="text-xs text-muted-foreground block text-left mt-1">12:25 ✓</span>
                            </div>
                        </div>
                         {/* User Message with loading dots */}
                        <div className="flex items-start gap-3 justify-end">
                            <div className="bg-primary text-white p-3 rounded-lg max-w-md flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1 [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:0.4s]"></span>
                            </div>
                            <Avatar className="w-10 h-10">
                                <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <DialogFooter className="p-4 border-t border-gray-200">
                        <div className="w-full">
                           <MessageInput/>
                        </div>
                    </DialogFooter>
                </div>
                {/* Left Sidebar for Previous Conversations */}
                <div className="max-lg:hidden col-span-1 border-l border-gray-200 p-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">محادثات سابقة</h2>
                    <div className="flex-grow space-y-2 overflow-y-auto">
                        <button className="w-full text-right p-3 rounded-lg bg-gray-100 font-semibold">تلخيص المحاضرة</button>
                        <button className="w-full text-right p-3 rounded-lg hover:bg-gray-100">ما الذي سوف تستفيد به من الدورة</button>
                        <button className="w-full text-right p-3 rounded-lg hover:bg-gray-100">ما الذي سوف تستفيد به من الدورة</button>
                        <button className="w-full text-right p-3 rounded-lg hover:bg-gray-100">ما الذي سوف تستفيد به من الدورة</button>
                    </div>
                </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AiDialog;