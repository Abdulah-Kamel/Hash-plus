import {TabsContent} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import CommentInput from "@/components/course-page/CommentInput";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image";
import instructorAvatar from "@/assets/courseProfile.png";
import {CornerUpLeft, Heart} from "lucide-react";

const CommunityTab = () => {
    const isTextArea = false;
    return (
        <TabsContent value="community">
            <Card className="border-none shadow-none">
                <CardHeader className={"flex items-center gap-4"}>
                    <Avatar className="w-12 h-12">
                        <AvatarFallback className="p-2 text-primary border border-primary bg-transparent">م ع</AvatarFallback>
                    </Avatar>
                   <div className="w-full h-full">
                       <CommentInput btnClassName={"rounded-lg"} isTextArea={isTextArea}/>
                   </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Community Post 1 */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div>
                          <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12">
                                      <Image src={instructorAvatar} alt={"profile image"} className="w-full h-full object-cover"/>
                                      <AvatarFallback className="bg-gray-300">م ع</AvatarFallback>
                                  </Avatar>
                                  <div className="flex items-center gap-1">
                                      <h4 className="font-semibold">محمد علي</h4>
                                      <p className="text-sm text-muted-foreground">منذ 3 أسابيع</p>
                                  </div>
                              </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">
معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؟                          </p>
                          <div className="mt-3 flex items-center gap-4">
                              <Heart className="text-red-500 fill-red-500"/>
                              <p className="border-2 border-y-0 border-gray-200 px-4 text-muted-foreground">
                                  12 تعليق
                              </p>
                              <button className="hover:text-primary cursor-pointer font-light flex items-center gap-1">
                                  <CornerUpLeft className="font-light"/>
                                  تعليق
                              </button>
                          </div>
                      </div>
                        <div className="mx-2 sm:mx-12 mt-3">
                          <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12">
                                      <Image src={instructorAvatar} alt={"profile image"} className="w-full h-full object-cover"/>
                                      <AvatarFallback className="bg-gray-300">م ع</AvatarFallback>
                                  </Avatar>
                                  <div className="flex items-center gap-1">
                                      <h4 className="font-semibold">محمد علي</h4>
                                      <p className="text-sm text-muted-foreground">منذ 3 أسابيع</p>
                                  </div>
                              </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">
معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؟                          </p>
                          <div className="mt-3 flex items-center gap-4">
                              <Heart className="text-red-500 fill-red-500"/>
                              <p className="border-2 border-y-0 border-gray-200 px-4 text-muted-foreground">
                                  12 تعليق
                              </p>
                              <button className="hover:text-primary cursor-pointer font-light flex items-center gap-1">
                                  <CornerUpLeft className="font-light"/>
                                  تعليق
                              </button>
                          </div>
                            {/* Comment Input for this post */}
                            <div className="mt-4 flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="text-xs bg-gray-200">أ</AvatarFallback>
                                </Avatar>
                                <div className="w-full h-full">
                                    <CommentInput btnClassName={"rounded-lg"} isTextArea={isTextArea}/>
                                </div>
                            </div>
                      </div>


                    </div>
                    {/* Community Post 1 */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="border-b border-gray200 pb-6">
                          <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12">
                                      <Image src={instructorAvatar} alt={"profile image"} className="w-full h-full object-cover"/>
                                      <AvatarFallback className="bg-gray-300">م ع</AvatarFallback>
                                  </Avatar>
                                  <div className="flex items-center gap-1">
                                      <h4 className="font-semibold">محمد علي</h4>
                                      <p className="text-sm text-muted-foreground">منذ 3 أسابيع</p>
                                  </div>
                              </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">
معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؟                          </p>
                          <div className="mt-3 flex items-center gap-4">
                              <Heart className="text-red-500 fill-red-500"/>
                              <p className="border-2 border-y-0 border-gray-200 px-4 text-muted-foreground">
                                  12 تعليق
                              </p>
                              <button className="hover:text-primary cursor-pointer font-light flex items-center gap-1">
                                  <CornerUpLeft className="font-light"/>
                                  تعليق
                              </button>
                          </div>
                      </div>
                        <div className="mx-2 sm:mx-12 mt-3">
                          <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12">
                                      <Image src={instructorAvatar} alt={"profile image"} className="w-full h-full object-cover"/>
                                      <AvatarFallback className="bg-gray-300">م ع</AvatarFallback>
                                  </Avatar>
                                  <div className="flex items-center gap-1">
                                      <h4 className="font-semibold">محمد علي</h4>
                                      <p className="text-sm text-muted-foreground">منذ 3 أسابيع</p>
                                  </div>
                              </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">
معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؟                          </p>
                          <div className="mt-3 flex items-center gap-4">
                              <Heart className="text-red-500 fill-red-500"/>
                              <p className="border-2 border-y-0 border-gray-200 px-4 text-muted-foreground">
                                  12 تعليق
                              </p>
                              <button className="hover:text-primary cursor-pointer font-light flex items-center gap-1">
                                  <CornerUpLeft className="font-light"/>
                                  تعليق
                              </button>
                          </div>

                      </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

    );
};

export default CommunityTab;
