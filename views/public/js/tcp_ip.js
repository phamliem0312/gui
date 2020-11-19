$(document).ready(() => {
    let ip_addr_s, port_s, conn_s;
    let ip_addr_c, port_c, conn_c;
    $(".edit").on("click", () => {
        $("#select").show();
        $("#edit").hide();
        $("#server_cf").hide();
        $("#client_cf").hide();
    });
    $("#server").on("click", () => {
        $("#update_server").show();
        $("#update_client").hide();
        $("#Ip_addr_s").val(ip_addr_s);
        $("#Port_s").val(port_s);
        $("#max_conn").val(conn_s);
    });
    $("#client").on("click", () => {
        $("#update_client").show();
        $("#update_server").hide();
        $("#Ip_addr_c").val(ip_addr_c);
        $("#Port_c").val(port_c);
        $("#reconn_time").val(conn_c);
    });
    fetch('http://localhost:3001/get').then((res) => {
        res.json().then((json) => {
            ip_addr_s = json.msg.server.ip_addr;
            port_s = json.msg.server.port;
            conn_s = json.msg.server.max_connection;
            ip_addr_c = json.msg.client.ip_addr;
            port_c = json.msg.client.port;
            conn_c = json.msg.client.reconnect_time;
            $("#_server").text(json.msg.client.is_server);
            $("#ip_addr_s").text(ip_addr_s);
            $("#port_s").text(port_s);
            $("#conn_s").text(conn_s);
            $("#_client").text(json.msg.client.is_client);
            $("#ip_addr_c").text(ip_addr_c);
            $("#port_c").text(port_c);
            $("#conn_c").text(conn_c);
        })
    }).catch((err) => {
        console.log(err);
    });
    $("#set_server").on("click", ()=>{
        let addr = $("#Ip_addr_s").val();
        let port = $("#Port_s").val();
        let max_conn = $("#max_conn").val();
        let data = {
            "ip_addr": addr,
            "port": port,
            "max_connection": max_conn 
        }
        const options = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
          };
        fetch('http://localhost:3001/set_server', options).then((res)=>{
            console.log(res.status);
        }).catch((err)=>{
            console.log(err);
        })
    });
    $("#set_client").on("click", ()=>{
        let addr = $("#Ip_addr_c").val();
        let port = $("#Port_c").val();
        let reconn = $("#reconn_time").val();
        let data = {
            "ip_addr": addr,
            "port": port,
            "reconnect_time": reconn 
        }
        const options = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
          };
        fetch('http://localhost:3001/set_client', options).then((res)=>{
            console.log(res.status);
        }).catch((err)=>{
            console.log(err);
        })
    });
});