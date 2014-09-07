var svgDocument;
var svgDocument;
var xmlns="http://www.w3.org/2000/svg"
function startup(evt) {
	O=evt.target
	svgDocument=O.ownerDocument
	ckbtn = svgDocument.getElementById("CK");
	ckbtn.setAttribute("onmousedown","onestep()")
}

var style_d = "fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1";

var style_e = "fill:none;fill-rule:evenodd;stroke:red;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1";

function enable(wire)
{
	obj=svgDocument.getElementById(wire);
	obj.setAttribute("style", style_e);
}

function disable(wire)
{
	obj=svgDocument.getElementById(wire);
	obj.setAttribute("style", style_d);
}

function toggle(wire)
{
	obj=svgDocument.getElementById(wire);
	if ( obj == null )
	{
		alert(wire);
	}
	if ( obj.getAttribute("style") == style_e )
	{
		obj.setAttribute("style", style_d);
	}
	else
	{
		obj.setAttribute("style", style_e);
	}
}
var ctrl_desc = [ 'ir_rc', 'ir_wc', 'out_rc', 'out_wc', 'in_rc', 'in_wc', 'ac_rc', 'ac_wc',
                  'mbr_rc', 'mbr_wc', 'pc_incc', 'pc_rc', 'pc_wc', 'mar_rc', 'mar_wc',
                  'ula_opc', 'rula_rc', 'rula_wc', 'mem_rc', 'mem_wc' ];
var ctrl = [ 
//   IR    OUT   IN    AC    MBR     PC     MAR ULA RULA   MEM
//  r  w  r  w  r  w  r  w  r  w inc r  w  r  w op  r  w  r  w
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
  [ 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
];

var desc = [
	"(1) MAR ⇦ PC",
	"(2) MBR ⇦ Memória[MAR]",
	"(3) IR ⇦ MBR",
	"(4) incrementa PC",
	"(5) MAR ⇦ IR11...IR0",
	"(6) decodificando...",
	"(7) MBR ⇦ Memória[MAR]",
	"(8) Rula ⇦ AC + MBR",
	"(9) AC ⇦ Rula"
];

var step = -1;
function onestep(){
	if ( step < ctrl.length-1 )
	{
		step++;
	}
	else
	{
		step = 0;
	}

	var passoElement = svgDocument.getElementById('passo');
	var newtext = svgDocument.createTextNode(desc[step]);
	var oldtext = passoElement.firstChild;
	passoElement.replaceChild(newtext, oldtext);

	var ctrlstep = ctrl[step];
	for ( i = 0; i < ctrl_desc.length; i++ ) 
	{
		wire = ctrl_desc[i];
		if ( ctrlstep[i] )
			enable(wire);
		else
			disable(wire);
	}
}
