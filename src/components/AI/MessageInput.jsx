'use client';
import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smile, Paperclip } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import {Textarea} from "@/components/ui/textarea";

const MessageInput = () => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [inputText, setInputText] = useState("");
    const emojiPickerRef = useRef(null);

    useOnClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

    const onEmojiClick = (emojiObject) => {
        setInputText(prevInput => prevInput + emojiObject.emoji);
    };

    return (
        <div className="flex items-end gap-3">
            <div className="relative w-full">
                <Textarea
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full pr-4 pl-4 py-4 rounded-xl border-gray-200 focus:ring-primary focus:border-primary resize-none"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={1}
                />
                <div className="absolute left-3 bottom-3 flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Paperclip className="text-gray-500 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowEmojiPicker(val => !val)}>
                        <Smile className="text-gray-500 h-4 w-4" />
                    </Button>
                    <Button variant={"outline"} className="rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white cursor-pointer px-4 py-2 text-sm">
                        ارسال
                    </Button>
                </div>
                {showEmojiPicker && (
                    <div ref={emojiPickerRef} className="absolute bottom-full max-sm:-left-[5%] left-0 z-10 mb-2">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageInput;
