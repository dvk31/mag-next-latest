// src/app/api/magazines/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { CoverPageData } from '@/types/coverpage';

export async function GET() {
  try {
    const dataFilePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data: CoverPageData = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return NextResponse.json({ error: 'Error reading data file' }, { status: 500 });
  }
}