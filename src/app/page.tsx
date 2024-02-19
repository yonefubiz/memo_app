'use client'
import { useState, useEffect } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link} from "@nextui-org/react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/memos")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => alert("error"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button href="/new" as={Link} color="primary">New</Button>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>タイトル</TableColumn>
            <TableColumn>コンテンツ</TableColumn>
            <TableColumn>作成日</TableColumn>
            <TableColumn>更新日</TableColumn>
          </TableHeader>
          <TableBody items={data}>
            {(item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.content.slice(12)}</TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>{item.updated_at}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    </main>
  );
}
