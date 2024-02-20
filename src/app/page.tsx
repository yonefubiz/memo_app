'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link, Spinner } from "@nextui-org/react";

export default function Home() {
  const MAX_LENGTH = 10;
  const router = useRouter()
  const [data, setData] = useState([]);

  useEffect(() => {
    const ret = fetch("/api/memos")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => alert("error"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        { !data ? <Spinner />:
        <div>
        <Button href="/new" as={Link} color="primary">New</Button>
        <Table
          isStriped
          selectionMode="single"
          onSelectionChange={(key: any) =>
              router.push('/memo/' + key.currentKey)
          }
        >
          <TableHeader>
            <TableColumn>タイトル</TableColumn>
            <TableColumn>コンテンツ</TableColumn>
            <TableColumn>作成日</TableColumn>
            <TableColumn>更新日</TableColumn>
          </TableHeader>
          <TableBody items={data}>
            {(item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.title.substring(0, MAX_LENGTH) + (item.title.length > MAX_LENGTH ? "..." : "")}</TableCell>
                <TableCell>{item.content.substring(0, MAX_LENGTH) + (item.content.length > MAX_LENGTH ? "..." : "")}</TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>{item.updated_at}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
        }
    </main>
  );
}
