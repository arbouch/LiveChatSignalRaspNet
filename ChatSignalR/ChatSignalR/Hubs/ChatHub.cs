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
    }
}
