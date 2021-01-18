function gacha(config, rval){
//		target = document.getElementById("output");
//		target.innerHTML = "Penguin";

  let accum = 0;
  for (const entry of config) {
    for (const charID of entry.ids) {
      accum += entry.prob / entry.ids.length;
      if (rval < accum) return { id: charID };
    }
  }
  throw new Error('should not reach here');
	}


async function getDataFromDB() {
  // data for gacha
  const info = {
    weights: [[5, 0.1], [4, 0.3], [3, 0.6]],
  };
  // data for character
  const master = [
    { id: 'S賞商品1', rarity: 5 }, // other attributes are ommitted
    { id: 'S賞商品2', rarity: 5 },
    { id: 'A賞商品1', rarity: 4 },
    { id: 'A賞商品2', rarity: 4 },
    { id: 'A賞商品3', rarity: 4 },
    { id: 'B賞商品1', rarity: 3 },
    { id: 'B賞商品2', rarity: 3 },
    { id: 'B賞商品3', rarity: 3 },
  ];

  return [info, master];
}

async function getConfig() {
  const config = [];
  const [info, master] = await getDataFromDB();
  info.weights.forEach(([rarity, prob]) => {
    const ids = master
      .filter(x => x.rarity === rarity)
      .map(x => x.id);
    config.push({ rarity, prob, ids });
  });
  return config;
}

async function main() {
  const config = await getConfig();
  target = document.getElementById("output");
  target.innerHTML = "";
  count = document.getElementById("count").value;
  var s =0;a=0;b=0;
  for(var i = 0;i < count;i++){
    rand =  Math.floor(Math.random() * 1000)/ 1000;
    if(rand < 0.1){
        s = s+1;
    }else if(rand < 0.4){
        a = a+1;
    }else{
        b = b+1;
    }
    result = gacha(config,rand);
    var num = i + 1;
    var text = "<div>" + num + "回目：" + result["id"] + "     :重さ"+rand+"</div>";
    target.innerHTML = target.innerHTML + text;
  }
  var total = "<div>合計：" +  "S賞："+ s +"回" + "A賞：" + a + "回" + "B賞:" + b + "回" + "</div>";
  target.innerHTML = target.innerHTML + total;
}

//main();
  var id = 0;
  function modal_close(){
    document.getElementById("popup_1").style.display = "none";
    document.getElementById("popup_2").style.display = "none";
    document.getElementById("popup_3").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("arrow_btn_left").style.display = "none";
    document.getElementById("arrow_btn_right").style.display = "none";
  }
  function modal_show(pop_id){
    id = pop_id;
    id_name = "popup_"+id;
    document.getElementById(id_name).style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("arrow_btn_left").style.display = "block";
    document.getElementById("arrow_btn_right").style.display = "block";
  }

  function preview(){
    id_name = "popup_"+id;
    document.getElementById(id_name).style.display = "none";
    id = id - 1;
    if(id < 1){
      id = 3
    }
    id_name = "popup_"+id;
    document.getElementById(id_name).style.display = "block";
  }

  function next(){
    id_name = "popup_"+id;
    document.getElementById(id_name).style.display = "none";
    id = id +1;
    if(id > 3){
      id = 1     
    }
    id_name = "popup_"+id;
    document.getElementById(id_name).style.display = "block";
  }

 $(document).ready(function () {
        var userAgent = window.navigator.userAgent;
        var msg = "";
        var twitter = "";
        if(userAgent.indexOf('iPhone') > 0 || userAgent.indexOf('iPod') > 0 || userAgent.indexOf('iPad') > 0){
          msg = "あなたの端末はiPhone";
          twitter = "<a href='https://twitter.com/intent/tweet?text=本文'><img src='images/124021.png' style='width: 100px;height: auto;'></a>"
        } else if(userAgent.indexOf('Android') > 0){
          msg = "あなたの端末はandroid";
          twitter = "<a href='intent://post?message=本文#Intent;scheme=twitter;package=com.twitter.android;end;'><img src='./124021.png' style='width: 100px;height: auto;'></a>"
        }else{
          msg = "あなたの端末はPC";
          twitter = "<a href='https://twitter.com/?status=本文'><img src='images/124021.png' style='width: 100px;height: auto;'></a>"
        }

        $('div#userAgent').text(msg);
        document.getElementById("twitter").innerHTML = twitter;
    });