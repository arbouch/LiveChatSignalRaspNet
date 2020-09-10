using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Hubs
{
    public class ChatHub: Hub
    {
        public async Task sendMessage(string fromUser, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", fromUser, message);
        }
        public Task SendMessageToCaller(string fromUser, string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", fromUser, message);
        }
        public Task SendMessageToUser(string connectionId, string fromUser, string message)
        {
            return Clients.Client(connectionId).SendAsync("ReceiveMessage", fromUser, message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }
        
        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }
    }
}
