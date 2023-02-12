import http from 'http';
import console from 'console';

export default function (input) {
  const {month,day,} = input
  
  var url = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/"
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
  var res = []
  var ans = {}

  try{
    res = http.getUrl(url1,{query: options})
    ret = JSON.parse(res)
    var title = ret.events[0].text
    ans["title"] = String(title)
    // var imgUrl = ret.events[0].pages[1].originalimage.source
    // tmp1 = {"imgUrl": String(imgUrl)}
    // ans.push(tmp1)
    var desc = ret.events[0].pages[2].extract
    ans["desc"] = String(desc)
    var originalLink = ret.events[0].pages[0].content_urls.desktop.page
    ans["originalLink"] = String(originalLink)
  }
  catch(err){
    console.log("ERROR: "+err)
  }

  return ans
}