"""Recreate the three public planning PDFs (requires reportlab and Pillow)."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'/'downloads'
OUT.mkdir(parents=True,exist_ok=True)
for name,file in [('EonSerif','dm-serif-display.ttf'),('EonSans','manrope-400.ttf'),('EonBold','manrope-700.ttf')]: pdfmetrics.registerFont(TTFont(name,str(ROOT/'assets'/'fonts'/file)))
GREEN=HexColor('#153e34');CREAM=HexColor('#f5f2e9');ORANGE=HexColor('#de773f');MUTED=HexColor('#657360')
W,H=595.28,841.89
body=ParagraphStyle('body',fontName='EonSans',fontSize=10,leading=16,textColor=MUTED,spaceAfter=10)

def paragraph(c,text,y,width=491):
 p=Paragraph(text,body);_,h=p.wrap(width,700);p.drawOn(c,52,y-h);return y-h-14

def create(filename,title,subtitle,sections,footer):
 c=canvas.Canvas(str(OUT/filename),pagesize=(W,H));c.setTitle(title+' | EonTera Tech LLP');c.setAuthor('EonTera Tech LLP')
 c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColor(GREEN);c.rect(0,H-207,W,207,fill=1,stroke=0)
 c.setFillColor(ORANGE);c.rect(52,H-49,6,6,fill=1,stroke=0)
 c.setFillColor(CREAM);c.setFont('EonBold',9);c.drawString(67,H-49,'EONTERA TECH LLP')
 c.setFont('EonSerif',33);c.drawString(52,H-105,title)
 p=Paragraph(subtitle,ParagraphStyle('sub',fontName='EonSans',fontSize=10,leading=16,textColor=HexColor('#ccdac8')));_,h=p.wrap(480,60);p.drawOn(c,52,H-136-h)
 y=H-240
 for number,heading,text in sections:
  c.setFillColor(ORANGE);c.setFont('EonSans',9);c.drawString(52,y,number)
  c.setFillColor(GREEN);c.setFont('EonSerif',20);c.drawString(80,y-2,heading)
  y=paragraph(c,text,y-19)
 c.setStrokeColor(HexColor('#bcc8b4'));c.line(52,99,W-52,99)
 p=Paragraph(footer,ParagraphStyle('foot',fontName='EonSans',fontSize=8,leading=12,textColor=MUTED));_,h=p.wrap(491,80);p.drawOn(c,52,85-h)
 c.setFillColor(GREEN);c.setFont('EonSans',8);c.drawString(52,34,'doshijesika73@gmail.com  |  +91 98673 42253');c.drawRightString(W-52,34,'EONTERA / 01')
 c.save()

create('eontera-company-overview.pdf','Protecting every layer.','A concise introduction to EonTera Tech LLP.<br/>From basement to terrace.',[
 ('01','A connected portfolio','Polymer-based waterproofing membranes; basement and foundation waterproofing; roof, terrace and wet-area protection; manufactured membrane sheets.'),
 ('02','Support around the material','Project requirement assessment, product selection support, application guidance, contractor and builder support, and private-label partnership discussions.'),
 ('03','The spaces we build for','Residential, commercial, infrastructure, industrial and institutional projects. We welcome builders, contractors, applicators, consultants, distributors and manufacturing partners.'),
 ('04','A focused team','Designated partners: Jesika Dalpatlal Doshi, Anuj Ashok Mody and Anand Narshimha Bajikar. Company location: Shop No. 9, East Bharatkunj CHS, Vile Parle (East), Mumbai, Maharashtra, India, 400057.'),
 ],'Portfolio introduction based on the supplied company information. Contact the team for current product availability and approved technical information. This document is not a product datasheet.')

create('eontera-project-checklist.pdf','Bring the right details.','A practical checklist for your first waterproofing project conversation.',[
 ('01','Your project','Project name, location, building type, stage of construction and target timeline. Include the best contact person and their role.'),
 ('02','The application area','Basement, foundation, roof, terrace, wet area or complete structure. Note approximate area, access conditions and the surface or substrate involved.'),
 ('03','The present condition','Describe any visible leakage, dampness or cracks. Note previous repairs or existing coatings. Share clear, relevant site photos through your chosen communication channel.'),
 ('04','What you need to confirm','Ask about product suitability, current availability, substrate preparation, detailing, approved installation guidance, coverage, packaging and required technical documentation.'),
 ('05','The next conversation','Share the checklist with your project team and EonTera. Final selection should follow an assessment of the actual application and site conditions.'),
 ],'This is a project briefing checklist, not an installation method or engineering assessment. Do not send unrelated personal information or confidential project material without authorisation.')

create('eontera-protection-guide.pdf','Start with the structure.','Five considerations for a more useful protection conversation.',[
 ('01','Look at the whole envelope','Map the areas exposed to water or moisture: below-ground spaces, wet rooms, roofs and terraces. Consider how those areas connect.'),
 ('02','Describe the exposure','Discuss the source and timing of moisture, the location of visible symptoms and the conditions around the structure. Avoid assuming one cause from a surface mark alone.'),
 ('03','Understand the surface','Identify the substrate and existing materials. Site readiness, access, junctions and penetrations all belong in the planning discussion.'),
 ('04','Ask for the approved details','Use current product-specific technical information. Confirm compatibility, application sequence and any testing or inspection requirements with the responsible professionals.'),
 ('05','Coordinate the people','Bring the owner, consultant, contractor and product team into the same discussion. Agree on responsibilities and the information needed for the next decision.'),
 ],'General planning information only. This guide does not specify a product or installation system and does not replace a qualified project assessment.')
print('Created 3 public planning PDFs.')
