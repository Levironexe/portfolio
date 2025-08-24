import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(_request: NextRequest) {
  // Will update in the future
  return NextResponse.json({ message: 'Not implemented yet' }, { status: 501 })
}