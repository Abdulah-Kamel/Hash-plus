'use client';

import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smile, Paperclip } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import {Textarea} from "@/components/ui/textarea";

const CommentInput = ({btnClassName,isTextArea}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [inputText, setInputText] = useState("");
    const emojiPickerRef = useRef(null);

    useOnClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

    const onEmojiClick = (emojiObject) => {
        setInputText(prevInput => prevInput + emojiObject.emoji);
    };

    return (
        <div className="flex items-center gap-4">
            <div className="relative w-full">
                {isTextArea
                ?
                    <Textarea
                        placeholder="اكتب تعليقك هنا..."
                        className="w-full pr-12 pl-20 py-6 rounded-lg  border-gray-200 focus:ring-primary focus:border-primary"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    :
                    <Input
                        placeholder="اكتب تعليقك هنا..."
                        className="w-full pr-12 pl-20 py-6 rounded-lg  border-gray-200 focus:ring-primary focus:border-primary"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                }

                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                        <Paperclip className="text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setShowEmojiPicker(val => !val)}>
                        <Smile className="text-gray-500" />
                    </Button>
                </div>
                {showEmojiPicker && (
                    <div ref={emojiPickerRef} className="absolute bottom-full left-0 z-10">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
            <Button variant={"outline"} className={`rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white cursor-pointer px-4 py-6 ${btnClassName}`}>
                ارسال
            </Button>
        </div>
    );
};

export default CommentInput;
