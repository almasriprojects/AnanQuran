import { Server as SocketIOServer } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import type { NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface SocketServer extends HTTPServer {
  io?: SocketIOServer
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

let io: SocketIOServer

export async function GET(req: NextRequest, res: NextApiResponseWithSocket) {
  if (!io) {
    console.log('Socket is initializing')
    io = new SocketIOServer(res.socket.server as SocketServer)
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log(`New client connected: ${socket.id}`)
      
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`)
      })

      // Add your custom socket event handlers here
    })
  } else {
    console.log('Socket is already running')
  }

  return new Response('Socket.IO server running', {
    status: 200,
  })
}