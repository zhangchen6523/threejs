/**/_jsload2&&_jsload2('copyrightctrl', 'z.extend(Zb.prototype,{vf:function(){this.M&&this.Fe(this.M)},initialize:function(a){Tb.prototype.initialize.call(this,a);this.Ea();this.Rn();this.ga(a);return this.P},ga:function(a){var b=this;a.addEventListener("load",function(){b.Rn()});a.addEventListener("moveend",function(){b.Rn()});a.addEventListener("zoomend",function(){b.Rn()});a.addEventListener("maptypechange",function(){b.P&&(b.P.style.color=b.M.va().hm())})},Ea:function(){Tb.prototype.Ea.call(this);z.U.eb(this.P,"BMap_cpyCtrl");var a= this.P.style;a.cursor="default";a.whiteSpace="nowrap";a.MozUserSelect="none";a.color=this.M.va().hm();a.background="none";a.font="11px/15px "+H.fontFamily;Tb.prototype.er.call(this)},Rn:function(){if(this.M&&this.P&&0!=this.dc.length)for(var a=0,b=this.dc.length;a<b;a++){this.M.ja();var c=this.M.Gb({x:0,y:0}),e=this.M.Gb({x:this.M.width,y:this.M.height}),c=new fb(c,e);if(this.dc[a].bounds&&c.Es(this.dc[a].bounds)==q){if(this.P)for(e=0;e<this.P.children.length;e++)if(this.P.children[e].getAttribute("_cid")== this.dc[a].id&&"none"!=this.P.children[e].style.display){this.P.children[e].style.display="none";return}}else if(this.P){for(var c=t,e=0,f=this.P.children.length;e<f;e++)if(this.P.children[e].getAttribute("_cid")==this.dc[a].id){c=p;this.P.children[e].style.display="inline";this.P.children[e].innerHTML!=this.dc[a].content&&(this.P.children[e].innerHTML=this.dc[a].content);break}c||this.nq(this.dc[a])}}},Ov:function(a){if(a&&Ya(a.id)&&!isNaN(a.id)){var b={bounds:q,content:""},c;for(c in a)b[c]=a[c]; if(a=this.am(a.id))for(var e in b)a[e]=b[e];else this.dc.push(b);this.Rn()}},am:function(a){for(var b=0,c=this.dc.length;b<c;b++)if(this.dc[b].id==a)return this.dc[b]},WC:x("dc"),sE:function(a){for(var b,c=0,e=this.dc.length;c<e;c++)this.dc[c].id==a&&(b=this.dc.splice(c,1),c--,e=this.dc.length);(a=this.Xc(a))&&a.parentNode&&a.parentNode.removeChild(a);this.Rn();return b},nq:function(a){this.P&&(this.P.innerHTML+="<span _cid=\'"+a.id+"\'>"+a.content+"</span>")},Xc:function(a){var b=Tb.prototype.Xc.call(this); if(Hb(a)){if(b)for(var c=0,e=b.children.length;c<e;c++)if(b.children[c].getAttribute("_cid")==a)return b.children[c]}else return b}});V(Tf,{addCopyright:Tf.Ov,removeCopyright:Tf.sE,getCopyright:Tf.am,getCopyrightCollection:Tf.WC}); ');