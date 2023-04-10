import http from 'http';
import console from 'console';

export default function (input) {
  const {dateTimeExpression} = input
  
  var url = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/"
  var month,day

  if(dateTimeExpression.date){
    month = dateTimeExpression.date.month
    day = dateTimeExpression.date.day    
  }
  var url1 = url.concat(month,"/",day)
  var options = {}

  options["language"] = "en"
  options["type"] = "events"
  
  if(typeof(month)!="undefined"){
    options["MM"]=String(month)
  }

  if(typeof(day)!="undefined"){
    options["DD"]=String(day)
  }

  // try{
  //   res = http.getUrl(url1,{query: options})
  //   title = JSON.parse(res).events[0].text
  //   // var title = ret.events[0].text
  
  // }
  // catch(err){
  //   console.log("ERROR: "+err)
  // }

  // return title


  var ret=[]
  // var events=[]
  var op=[]
  var res = []
  // var ans = {}

  try{
    res = http.getUrl(url1,{query: options})
    ret = JSON.parse(res)
    ret = ret.events
    // events = ret.events
  //   for (var i = ret.length - 1; i > 0; i--) {

  //     // Generate random number 
  //     var j = Math.floor(Math.random() * (i + 1));

  //     var temp = ret[i];
  //     ret[i] = events[j];
  //     ret[j] = temp;
  // }

  // for(var i=0;i<10;i++){
  //   var ans={}
  //   var title = ret.events[i].text
  //   ans["title"] = String(title)
  //   var imgUrl = ret.events[i].pages[1].originalimage.source
  //   // tmp1 = {"imgUrl": String(imgUrl)}
  //   // ans.push(tmp1)
  //   ans["imgUrl"] = String(imgUrl)
  //   var desc = ret.events[i].pages[0].extract
  //   ans["desc"] = String(desc)
  //   var originalLink = ret.events[i].pages[0].content_urls.desktop.page
  //   ans["originalLink"] = String(originalLink)
  //   op[i]=ans
  // }
  var ct=0,ct1=0,num=0
  for(var i=0;i<ret.length;i++){
    for(var j=0;j<ret[i].pages.length;j++){
      if(typeof ret[i].pages[j].originalimage != "undefined"){
        // console.log(ret[i].pages[j].originalimage.source)
        // bool = true
        ct1++
      }
      if(typeof ret[i].pages[j].extract != "undefined"){
          // console.log(i)
          // bool = true
          ct1++
        }
      if(typeof ret[i].pages[j].content_urls != "undefined"){
          // console.log(i)
          // bool = true
          ct1++
        }

      if(ct1==3){
        num=j
        break
      }
    }

    if(typeof ret[i].text !="undefined"){
      ct1++
    }
    if(ct1==4){
      // console.log(i)
    var ans={}
    var title = ret[i].text
    ans["title"] = String(title)
    var imgUrl = ret[i].pages[num].originalimage.source
    // tmp1 = {"imgUrl": String(imgUrl)}
    // ans.push(tmp1)
    ans["imgUrl"] = String(imgUrl)
    var desc = ret[i].pages[num].extract
    ans["desc"] = String(desc)
    var originalLink = ret[i].pages[num].content_urls.desktop.page
    ans["originalLink"] = String(originalLink)
    op[i]=ans
    ct++
    }

    if(ct==10){
      break
    }

    ct1=0
    num=0

  }

  
  }
  catch(err){
    console.log("ERROR: "+err)
  }
  

  return op
}