/**/_jsload2&&_jsload2('local', 'db.DL=function(a,b){return!a||"undefined"==typeof b||"s"==a&&11!=b&&7!=b&&2!=b&&26!=b&&28!=b||"nb"==a&&12!=b||"bd"==a&&21!=b||"bda"==a&&45!=b||"sa"==a&&46!=b||"nba"==a&&47!=b?t:p}; z.extend(db.prototype,{Qy:function(){for(var a=0,b=this.Ra.length;a<b;a++){var c=this.Ra[a];this[c.method].apply(this,c.arguments)}delete this.Ra;this.xa()},xa:function(){this.zm=new Gh(this);this.ym=new Hh(this)},search:function(a,b,c){if(!a||a instanceof Array&&(1>a.length||10<a.length))this.Pe(),this.Xa(5),this.Ja(Y.cc);else if(b=b||{},b.customData)this.$y(),this.Kr.search({wb:a,jp:"local",rw:b.customData}),this.Fl=p;else{this.Fl=t;var e=c||{},f=this;this.Jg(this.yd,function(c){c=c||1;f.Ec=f.Uz(a); c=f.Ec?{qt:"sa",c:c,wd:a.join("$$"),wdn:a.length,rn:f.mf()}:{qt:b.forceLocal?"con":"s",c:c,wd:a,rn:f.mf()};f.m.cp&&z.extend(c,{from:f.m.cp});z.extend(c,e.$c);b.log&&(c.log="center");var i={$c:c,options:b,td:e.td||a};z.extend(i,e);Ld.ob(function(a,b){f.If(a,b)},c,i)})}},Uz:function(a){return a&&a instanceof Array?p:t},Cm:function(a,b,c){if(!a||!b||a instanceof Array&&(1>a.length||10<a.length))this.Pe(),this.Xa(5),this.Ja(Y.cc);else{var c=c||{},e=this;if(c.customData)this.$y(),this.Kr.search({wb:a, fb:b,jp:"bound",rw:c.customData}),this.Fl=p;else{this.Fl=t;var f=c||{};this.Jg(this.yd,function(c){var c=c||1,i=b.Te(),k=b.Of(),i=S.gb(i),k=S.gb(k),i="("+i.lng+","+i.lat+";"+k.lng+","+k.lat+")";e.Ec=e.Uz(a);c=e.Ec?{qt:"bda",c:c,wd:a.join("$$"),wdn:a.length,ar:i,rn:e.mf(),l:18}:{qt:"bd",c:c,wd:a,ar:i,rn:e.m.yk,l:18};e.m.cp&&z.extend(c,{from:e.m.cp});z.extend(c,f.$c);Ld.ob(function(a,b){e.If(a,b)},c,f&&f.Ka&&f.Ca?{$c:c,fb:b,Ka:f.Ka,Ca:f.Ca,td:f.td||a}:{$c:c,fb:b,td:f.td||a})})}}},ip:function(a,b,c, e){if(!a||!b||!(b instanceof J)&&"object"==typeof b&&!b.uid||a instanceof Array&&(1>a.length||10<a.length))this.Pe(),this.Xa(5),this.Ja(Y.cc);else if(e=e||{},e.customData)this.$y(),this.Kr.search({wb:a,Ka:b,Ca:c,jp:"nearby",rw:e.customData}),this.Fl=p;else{this.Fl=t;var c=c||db.HF,c=0>c?db.HF:c>db.QF?db.QF:c,f=this,g=e||{};if(b instanceof J){var i=S.gb(b),e=new J(i.lng-c,i.lat-c),i=new J(i.lng+c,i.lat+c),e=S.fc(e),i=S.fc(i),e=new fb(new J(e.lng,e.lat),new J(i.lng,i.lat));g.Ka=b;g.Ca=c;this.Cm(a,e, g)}else this.Jg(this.yd,function(e){e=e||1;f.Ec=f.Uz(a);e=f.Ec?{qt:"nba",c:e,wd:a.join("$$"),wdn:a.length,rn:f.mf(),uid:b.uid,r:c}:{qt:"nb",c:e,wd:a,rn:f.mf(),uid:b.uid,r:c};if("string"==typeof b){if(f.Ec){e.qt="sa";for(var i=[],n=0;n<a.length;n++)i.push(b+" "+a[n]);e.wd=i.join("$$");e.wdn=i.length}else e.qt="s",e.wd=b+" "+a;delete e.r;delete e.uid}f.m.cp&&z.extend(e,{from:f.m.cp});z.extend(e,g.$c);Ld.ob(function(a,b){f.If(a,b)},e,{$c:e,Ka:b,Ca:c,td:g.td||a})})}},If:function(a,b){var c=this;c.Ec= 45==a.result.type||46==a.result.type||47==a.result.type?p:t;this.Pe();c.La=a;this.ya=b;var e=a.result,f=b.$c.qt;if(c.Ec){if(0!=e.error||!db.DL(f,e.type)){k=a.current_city;this.zi=[];for(var e=b.td,f=0,g=e.length;f<g;f++){var i=new Ih({wb:e[f],city:k.name,province:k.up_province_name||"",Yv:k.code,$o:c.mf(),Ka:b.Ka,Ca:b.Ca,fb:b.Ka&&b.Ca?l:b.fb,hi:""});i.CA=b.$c.qt;this.zi.push(i)}this.Xa(Md);this.Ja(Y.cc,this.zi);c.ym.dispatchEvent("render");return}}else if(0!=e.error||!db.DL(f,e.type)){var k=a.current_city; this.ma=new Ih({wb:b.td,city:k.name,province:k.up_province_name||"",Yv:k.code,$o:c.mf(),Ka:b.Ka,Ca:b.Ca,fb:b.Ka&&b.Ca?l:b.fb,hi:this.Eu(b,k)});this.ma.CA=b.$c.qt;this.Xa(Md);this.Ja(Y.cc,this.ma);c.ym.dispatchEvent("render");return}c.Sq(b);c.zm.dispatchEvent("render");c.ym.dispatchEvent("render");(e=this.ya.Ka)&&("string"!=typeof e&&!(e instanceof J))&&this.zm.Nv(e);e={};switch(this.La.result&&this.La.result.type){case 11:case 12:case 21:case 45:case 46:case 47:e.la=this.Hy;break;case 2:e.Ka=this.ma.pk(0).point; e.ug=this.La.content.level;break;case 28:e.Ka=this.ma.pk(0).point;e.ug=13;break;case 26:e.Ka=this.ma.pk(0).point,e.ug=parseInt(this.La.content[1])}this.zm.BK(e);e=this.Ec?this.xz():this.ma;this.m.pa.it&&(e&&0<e.ns())&&(c=this,setTimeout(function(){c.select(0)},240))},Sq:function(a){var b=this.La.result,c=this.La.content,e=this.La.current_city,f=b.type,g=b.page_num||0,i=0,k=0,m=[],n=[],o=[],s=[],v=[],w=[];if(this.La.psrs&&this.La.psrs.SEResult){var y=this.La.psrs.SEResult;if(0<y.length)for(var A=0, B=y.length;A<B;++A)w.push(y[A])}if(y=this.La.suggest_query){A=0;for(B=y.length;A<B;++A)y[A]&&y[A].query&&w.push(y[A].query)}w=bb.unique(w);if(7!=f&&26!=f){var C;this.Ec||(k=b.count-(0==g?b.spec_dispnum||0:0),i=760>b.total?b.total:760,C=0==g?b.spec_dispnum||0:0);if(2!=f)if(this.Ec){B=b.result_array;g=a.td.length;for(A=0;A<g;A++)if(s[A]=[],v[A]=[],o[A]=[],B[A])if(7==B[A].type){if(c&&c[A])for(C=0;C<c[A].length;C++)y=c[A][C],o[A].push({city:y.name,Xy:y.code,numResults:y.num});if(this.La.more_city&&this.La.more_city[A]){var F= this.La.more_city[A];C=0;for(var E=F.length;C<E;C++)for(var G=0,N=F[C].city.length;G<N;G++)y=F[C].city[G],o[A].push({city:y.name,Xy:y.code,numResults:y.num})}}else{y=B[A].count;v[A].push({count:y,UY:B[A].page_num||0,total:760<B[A].total?760:B[A].total});for(C=0;C<y;C++)if(c&&(c[A]&&c[A][C])&&(E=c[A][C],E.addr!==q)){G=this.MG(E.addr,E.poiType);F=[];if(E.cla&&0<E.cla.length)for(N=E.cla.length;N--;)L=E.cla[N][1],L=L.replace("<b>","").replace("</b>",""),F.unshift(L);E={title:E.name,uid:E.uid,point:bb.ze(E.geo, p).point,url:Y.Gu(E.uid,e.code),detailUrl:"http://api.map.baidu.com/place/detail?uid="+E.uid+"&output=html&source=jsapi",address:G,city:e.name,province:e.up_province_name||"",phoneNumber:E.tel,postcode:E.zip,type:E.poiType||0,isAccurate:E.acc_flag&&1==E.acc_flag?p:t,tags:F};s[A].push(E);n.push(E.point);this.uf.push(E)}}}else for(A=C;A<b.count;A++){if(c&&c[A]&&(E=c[A],E.addr!==q)){G=this.MG(E.addr,E.poiType);F=[];if(E.cla&&0<E.cla.length)for(N=E.cla.length;N--;){var L=E.cla[N][1],L=L.replace("<b>", "").replace("</b>","");F.unshift(L)}E={title:E.name,uid:E.uid,point:bb.ze(E.geo,p).point,url:Y.Gu(E.uid,e.code),detailUrl:"http://api.map.baidu.com/place/detail?uid="+E.uid+"&output=html&source=jsapi",address:G,city:e.name,province:e.up_province_name||"",phoneNumber:E.tel,postcode:E.zip,type:E.poiType||0,isAccurate:E.acc_flag&&1==E.acc_flag?p:t};0<F.length&&(E.tags=F);m.push(E);n.push(E.point);this.uf.push(E)}}else k=i=1,E={title:c.cname,uid:c.uid,point:bb.ze(c.geo,p).point,address:c.cname,url:D.Vo+ "?s="+encodeURIComponent("s&wd="+b.wd)},m.push(E),this.uf.push(E),n.push(E.point)}else if(26==f&&(k=i=1,E={title:b.wd,point:bb.$Y(c[0]),url:D.Vo+"?s="+encodeURIComponent("s&wd="+b.wd)},m.push(E),this.uf.push(E),n.push(E.point)),7==f){for(A=k=i=0;A<c.length;A++)o.push({city:c[A].name,Xy:c[A].code,numResults:c[A].num});if(this.La.more_city){F=this.La.more_city;A=0;for(E=F.length;A<E;A++){C=0;for(N=F[A].city.length;C<N;C++)c=F[A].city[C],o.push({city:c.name,Xy:c.code,numResults:c.num})}}}this.Hy=n;if(this.Ec){this.zi= [];g=a.td.length;b=p;for(A=0;A<g;A++)0<v[A].length&&0<v[A][0].total&&(b=t),m=new Ih({wb:a.td[A]||"",count:0<v[A].length?v[A][0].count:0,total:0<v[A].length?v[A][0].total:0,hE:0<v[A].length?v[A][0].UY:0,city:e.name,province:e.up_province_name||"",Yv:e.code,Bk:s[A]||[],zB:o[A]||[],$o:this.mf(),Ka:a.Ka,Ca:a.Ca,fb:a.Ka&&a.Ca?l:a.fb,hi:"",JN:w}),m.CA=a.$c.qt,this.zi.push(m);b?this.Xa(Md):this.Xa(0);this.Ja(Y.cc,this.zi)}else this.ma=new Ih({wb:a.td,count:k,total:i,hE:b.page_num,city:e.name,province:e.up_province_name|| "",Yv:e.code,Bk:m,zB:o,$o:this.mf(),Ka:a.Ka,Ca:a.Ca,fb:a.Ka&&a.Ca?l:a.fb,hi:this.Eu(a,e),JN:w}),this.ma.CA=a.$c.qt,0==i&&7!=f?this.Xa(Md):7!=f?this.Xa(0):this.Xa(1),this.Ja(Y.cc,this.ma)},Eu:function(a,b){var c="",c="string"==typeof a.Ka?a.Ka+" "+a.td:a.td,e=b.name,f,g,i;"object"==typeof a.Ka&&!(a.Ka instanceof J)&&(g=a.Ka.point,f=a.Ca);a.fb&&!a.Ka&&(i=a.fb);a.Ka&&a.Ka instanceof J&&(g=a.Ka,f=a.Ca);c=D.md+"place/search?res=jsapi&query="+c+"&region="+e+"&output=html";g&&(c+="&location="+g.lat+","+ g.lng+"&radius="+f);i&&(f=i.Te(),i=i.Of(),c+="&bounds="+f.lat+","+f.lng+","+i.lat+","+i.lng);return c},MG:function(a,b){b=b||0;return 1==b||3==b?bb.unique(a.split(";")).join("; "):a},S0:function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].FK())return p;return t},yj:function(){for(var a=0,b=this.Ba.length;a<b;a++)this.Ba[a].remove(),this.Ba[a]=q;a=this.Ba.length=0;for(b=this.uf.length;a<b;a++)this.uf[a]=q;this.uf.length=0;this.Py&&(this.Py.remove(),this.Py=q)},xz:function(){if(!this.Ec)return this.ma; for(var a,b=-1,c=0,e=this.zi.length;c<e;c++){var f=this.zi[c];f.Fo()>b&&(a=f,b=f.Fo())}return a},Pe:function(){delete this.La;delete this.Ke;delete this.ma;this.Ec&&delete this.zi;delete this.ya;this.cb=-1;this.Xa();this.yj();this.m.pa.Na&&(this.m.pa.Na.innerHTML="")},im:function(a){if(this.Fl)this.Kr.im(a);else if(this.ya){var b;b=this.Ec?this.xz():this.ma;if("number"==typeof a&&!isNaN(a)&&0<=a&&a<=b.Fo()-1)switch(this.ya.$c.pn=a,this.ya.$c.qt){case "s":case "con":this.search(this.ya.$c.wd,this.ya.options, this.ya);break;case "bd":this.Cm(this.ya.$c.wd,this.ya.fb,this.ya);break;case "nb":this.ip(this.ya.$c.wd,this.ya.Ka,this.ya.Ca,this.ya);break;case "bda":this.Cm(this.ya.td,this.ya.fb,this.ya);break;case "sa":this.search(this.ya.td,this.ya.options,this.ya);break;case "nba":this.ip(this.ya.td,this.ya.Ka,this.ya.Ca,this.ya)}else this.Xa(5),this.Ja(Y.cc)}},$y:function(){this.Kr||(this.Kr=new Jh(this))},select:function(a){this.zm.select(a);this.ym.select(a);this.cb=a}}); V(be,{gotoPage:be.im,searchNearby:be.ip,searchInBounds:be.Cm,search:be.search,clearResults:be.Pe});function Ih(a){this.keyword=a.wb||"";this.ES=a.hE||0;this.tQ=a.count||0;this.pA=a.total||0;this.vS=Math.ceil(a.total/a.$o);this.center=a.Ka;this.radius=a.Ca;this.bounds=a.fb;this.city=a.city;this.province=a.province;this.viewport=a.viewport;this.moreResultsUrl=a.hi;this.Pq=a.Bk&&a.Bk.slice(0)||[];this.RP=a.zB&&a.zB.slice(0);this.suggestions=a.JN||[]}z.extend(Ih.prototype,{pk:function(a){if(this.Pq[a])return this.Pq[a]},ns:x("pA"),Fo:x("vS"),FK:x("tQ"),OK:x("ES"),Dw:x("RP"),toString:da("LocalResult")}); var Kh=Ih.prototype;V(Kh,{getPoi:Kh.pk,getCurrentNumPois:Kh.FK,getNumPois:Kh.ns,getNumPages:Kh.Fo,getPageIndex:Kh.OK,getCityList:Kh.Dw});function Jh(a){z.lang.Ga.call(this);this.qa=a;this.qa.cb=-1}z.lang.wa(Jh,z.lang.Ga,"CustomSearch"); z.extend(Jh.prototype,{search:function(a){this.jp=a.jp;this.qa.Ec=t;if(this.Qy(a)){var b=this;this.qa.Jg(this.qa.yd,function(c){a.region=c;c=b.wR(a);b.lN(c,{$c:c,options:a})})}},Qy:function(){var a=p;qa||(this.qa.Xa(4),this.qa.Ja(Y.cc),a=t);return a},wR:function(a){var b=this.rw=a.rw;b&&b.geotableId&&(this.Ks=p);var c={region:a.region,page_size:this.qa.mf(),ak:qa};a.TY&&(c.page_index=a.TY);a.wb&&(c.q=a.wb);if(a.fb){var e=a.fb.Te(),f=a.fb.Of();c.bounds=this.Ks?e.lng+","+e.lat+";"+f.lng+","+f.lat:e.lat+ ","+e.lng+";"+f.lat+","+f.lng}if(a.Ka&&(a.Ka instanceof J||a.Ka.point instanceof J))e=q,a.Ka instanceof J?e=a.Ka:a.Ka.point instanceof J&&(e=a.Ka.point),c.location=this.Ks?e.lng+","+e.lat:e.lat+","+e.lng;"string"==typeof a.Ka&&(c.q=a.Ka+" "+a.wb,this.jp="local");a.Ca&&(c.radius=a.Ca);this.Ks?c.geotable_id=b.geotableId:b&&b.databoxId&&(c.filter="databox:"+b.databoxId);b.tags&&(c.tags=b.tags);b.filter&&(c.filter=b.filter);return c},lN:function(a,b){var c=this,e="geosearch/poi";this.Ks&&(e="geosearch/v2/"+ this.jp);Ld.ob(function(a,b){c.If(a,b)},a,b,e)},If:function(a,b){this.qa.Pe();this.qa.ya=b;if(0!=a.status)this.ma=new Ih({wb:b.options.wb,$o:this.qa.mf(),Ka:b.options.Ka||"",Ca:b.options.Ca||"",fb:b.options.fb||"",hi:""}),5==a.status?this.qa.Xa(4):this.qa.Xa(Md),this.qa.ma=this.ma,this.qa.Ja(Y.cc,this.ma),this.qa.ym.dispatchEvent("render");else{this.Sq(a,b);this.qa.zm.dispatchEvent("render");this.qa.ym.dispatchEvent("render");var c=b.options.Ka;c&&("string"!=typeof c&&!(c instanceof J)&&0==this.qa.fm())&& this.qa.zm.Nv(c);c={};c.la=this.qa.Hy;this.qa.zm.BK(c);c=this.qa.ma;if(this.qa.m.pa.it&&c&&0<c.ns()){var e=this;setTimeout(function(){e.qa.select(0)},240)}}},Sq:function(a,b){var c=a.content||{},e=[],f=[],g=this.Ks;g&&(c=a.contents);for(var i=0,k=a.size;i<k&&c[i];i++){var m=c[i],n=g?new J(m.location[0],m.location[1]):new J(m.longitude,m.latitude);e.push({title:g?m.title:m.name,uid:m.uid,point:n,url:"",address:g?m.address:m.addr,city:m.city,province:m.province,phoneNumber:m.tel,postcode:m.zip,type:m.cla}); f.push(n)}this.qa.uf=e;this.qa.Hy=f;this.ma=new Ih({wb:b.options.wb,count:a.size,total:a.total,hE:b.$c.page_index,city:"",province:"",Yv:"",Bk:e,$o:this.qa.mf(),Ka:b.options.Ka,Ca:b.options.Ca,fb:b.options.fb,hi:""});0==a.total?this.qa.Xa(Md):this.qa.Xa(0);this.qa.ma=this.ma;this.qa.Ja(Y.cc,this.ma)},im:function(a){var b=this.qa.ma;"number"==typeof a&&!isNaN(a)&&0<=a&&a<=b.Fo()-1?(this.qa.ya.$c.page_index=a,this.lN(this.qa.ya.$c,this.qa.ya)):(this.qa.Xa(5),this.qa.Ja(Y.cc))}});function Gh(a){z.lang.Ga.call(this);this.qa=a;this.map=a.m.pa.map;this.Ba=a.Ba;this.xa()}z.lang.wa(Gh,z.lang.Ga,"RenderMap"); z.extend(Gh.prototype,{xa:function(){this.addEventListener("render",this.Ea)},Ea:function(){if(this.map){for(var a=this,b=this.qa.uf,c=[],e=0,f=b.length;e<f;e++){var g=b[e];c.push(g.point);var i=this.nP(g.point,e,g.title);i&&(g.marker=i,function(){var b=e;i.addEventListener("click",function(){a.qa.select(b)})}(),this.Ba.push(i))}this.qa.Ja(Y.Bp,b)}},Nv:function(a){var b=this;if(a&&"string"!=typeof a&&!(a instanceof J)){var c=this.qa.Py=X.Nv(this.map,a.point,a.title);c.addEventListener("click",function(){b.qa.select(-1); b.qa.cb="c";var e=b.zG(a);c.Zc(e)})}},nP:function(a,b,c){return this.qa.m.yk<=db.Ep&&!this.qa.Ec?X.cU(this.map,a,b,c):X.bU(this.map,a,c)},select:function(a){if(this.map&&-1<a&&this.Ba[a]){if(I())for(var b=q,c=0,e=this.Ba.length;c<e;c++)b=this.Ba[c],a==c?b.Tb(b.qL):b.Tb(b.uD),b.draw;else{c=0;for(e=this.Ba.length;c<e;c++)b=this.Ba[c],b.oi(t)}this.map.Vc();if(b=this.qa.uf[a])b=this.zG(b),a=this.Ba[a],a.oi(p),a.Zc(b)}},zG:function(a){var b=X.oV({title:a.title,ur:a.address,C_:a.phoneNumber,url:a.url,zV:a.detailUrl, uid:a.uid,kZ:a.type}),c=this;b.addEventListener("close",function(){c.qa.ym.UU()});b.addEventListener("open",function(){c.qa.Ja(Y.Um,a,X.ks(c.map))});return b},BK:function(a){var b=this.qa.m.pa;if(this.map)if(a.la){var c=!b.Wg,b=!b.it&&b.Wg,a=this.map.ws(a.la,{margins:[30,30,30,30]});c||this.map.oh(a,{enableAnimation:b})}else a.ug=bb.Bw(a.ug,this.map),b.Wg&&this.map.Dd(a.Ka,a.ug)}});function Hh(a){z.lang.Ga.call(this);this.qa=a;this.Na=a.m.pa.Na;this.xa()}z.lang.wa(Hh,z.lang.Ga,"RenderList"); z.extend(Hh.prototype,{xa:function(){this.addEventListener("render",this.Ea)},Ea:function(){if(this.Na){var a=O("div",{style:"font:12px "+H.fontFamily+";border:1px solid #999;"}),b=O("div",{style:"background:#fff"}),c=O("ol",{style:"list-style:none;padding:0;margin:0"}),e=this.qa.fm(),f=q;if(0==e)for(var f=0,g=this.qa.uf.length;f<g;f++)e=this.iQ(f),c.appendChild(e);else if(1==e){if(1==e&&!this.qa.Ec){f=0;for(g=Math.min(6,this.qa.ma.Dw().length);f<g;f++)e=this.gQ(f),c.appendChild(e)}}else{f="";switch(e){case Md:f= "\\u62b1\\u6b49\\uff0c\\u672a\\u627e\\u5230\\u76f8\\u5173\\u5730\\u70b9\\u3002";break;case 4:f="\\u62b1\\u6b49\\uff0c\\u60a8\\u6240\\u63d0\\u4f9b\\u7684key\\u65e0\\u6548\\u3002"}e=O("li",{style:"margin:2px 0;padding:0 5px 0 3px;overflow:hidden;line-height:17px"});e.innerHTML=f;c.appendChild(e)}b.appendChild(c);a.appendChild(b);f=this.oQ();a.appendChild(f);this.Na.appendChild(a);this.qa.Ja(Y.Yt,a)}},iQ:function(a){var b=this.qa.uf;if(b&&b[a]){var b=b[a],c=O("li",{style:"margin:2px 0;padding:0 5px 5px 0px;cursor:pointer;overflow:hidden;line-height:17px;*zoom:1;"}); -1<this.qa.cb&&a==this.qa.cb&&(c.style.backgroundColor="#f0f0f0");var e=0==a?"0px":"-"+25*a+"px";if(this.qa.m.yk>db.Ep||this.qa.Ec)e="-275px";var e=["<span style=\'background:url("+D.md+"images/markers.png) -23px "+e+" no-repeat;width:19px;height:25px;cursor:pointer;float:left;*zoom:1;overflow:hidden;margin:2px 3px 0 5px;*margin-right:0px;display:inline;\'>&nbsp;</span>"],f,g=RegExp(this.qa.Ec?this.qa.ya.td.join("|"):this.qa.ma.keyword,"ig");b.title&&(f=b.title.replace(g,"<b>$&</b>"));1==b.type?f+= "-\\u516c\\u4ea4\\u8f66\\u7ad9":3==b.type&&(f+="-\\u5730\\u94c1\\u7ad9");e.push("<div style=\'zoom:1;overflow:hidden;padding:0 5px;\'>");e.push("<div style=\'line-height:20px;font-size:12px;\'><span style=\'color:#00c;\'>"+f+"</span>");b.detailUrl&&e.push("<a target=\'_blank\' href=\'"+b.detailUrl+"\' style=\'margin-left:5px;font-size:12px;color:#3d6dcc;font-weight:normal;text-decoration:none;\'>\\u8be6\\u60c5&raquo;</a>");e.push("</div>");b.address&&(f=b.address.replace(g,"<b>$&</b>"),e.push("<div style=\'padding:2px 0;line-height:18px;*zoom:1;overflow:hidden;\'><b style=\'float:left;font-weight:bold;*zoom:1;overflow:hidden;padding-right:5px;*margin-right:-3px;\'>\\u5730\\u5740:</b><span style=\'color:#666;display:block;zoom:1;overflow:hidden;\'>"+ f+"</span></div>"));b.phoneNumber&&e.push("<div style=\'padding:2px 0;line-height:18px;*zoom:1;overflow:hidden;\'><b style=\'float:left;font-weight:bold;*zoom:1;overflow:hidden;padding-right:5px;*margin-right:-3px;\'>\\u7535\\u8bdd:</b><span style=\'color:#666;\'>"+b.phoneNumber+"</span></div>");e.push("</div>");c.innerHTML=e.join("");var i=this;c.onclick=function(){i.qa.select(a)};return c}},oQ:function(){var a=this,b=O("div",{style:"white-space:nowrap;text-align:right;background:#e5ecf9;margin-top:5px;padding:2px;overflow:hidden;zoom:1;"}); if(!this.qa.Ec&&!this.qa.Fl){var c=O("a",{style:"color:#7777cc;float:right;",href:this.qa.ma.moreResultsUrl,target:"_blank",title:"\\u5230\\u767e\\u5ea6\\u5730\\u56fe\\u67e5\\u770b\\u66f4\\u591a\\u7ed3\\u679c"});c.innerHTML="\\u66f4\\u591a\\u7ed3\\u679c&#187;";b.appendChild(c)}var c=O("div",{style:"float:left;margin-right:5px"}),e=this.qa.xz();0<this.qa.uf.length&&new ae(c,function(b){a.qa.im(b-1)},{Id:e.Fo(),page:e.OK()+1,update:t});b.appendChild(c);return b},UU:function(){this.Na&&("number"==typeof this.qa.cb&& -1!=this.qa.cb&&this.Na.getElementsByTagName("li")[this.qa.cb])&&(this.Na.getElementsByTagName("li")[this.qa.cb].childNodes[1].style.backgroundColor="");this.qa.cb=-1},select:function(a){if(this.Na){var b=this.qa.cb;"number"==typeof b&&(-1!=b&&this.Na.getElementsByTagName("li")[b])&&(this.Na.getElementsByTagName("li")[b].childNodes[1].style.backgroundColor="");"number"==typeof a&&(-1!=a&&this.Na.getElementsByTagName("li")[a])&&(this.Na.getElementsByTagName("li")[a].childNodes[1].style.backgroundColor= "#f0f0f0")}},gQ:function(a){var b=O("li",{style:"margin:2px 0;padding:0 5px 0 3px;cursor:pointer;overflow:hidden;line-height:17px"});b.Ij=a;var c=this.qa.ma.Dw();b.innerHTML="<span style=\'color:#00c;text-decoration:underline\'>"+c[a].city+"</span> <span style=\'color:#666\'>(\\u5171"+c[a].numResults+"\\u6761\\u7ed3\\u679c)</span>";var e=this.qa,f=e.ma;b.onclick=function(){e.Fm(f.Dw()[a].city);e.search(f.keyword)};return b}}); ');
