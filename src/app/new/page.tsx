'use client'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import {Card, CardHeader, CardBody, CardFooter, Input, Divider, Button, ButtonGroup} from "@nextui-org/react";

export default function Memo() {
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputContent = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const onClickSave = async () => {
        fetch('/api/memo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: inputTitle.current?.value, content: inputContent.current?.value}),
        }).then((res) => res.json())
        .then((json) => router.push("/memo/" + json.id))
        .catch(() => alert("error"));
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <Input label="Title" ref={inputTitle}/>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Input label="Content" ref={inputContent}/>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <ButtonGroup>
                        <Button onClick={() => {onClickSave()}}>Save</Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </main>
    );
}