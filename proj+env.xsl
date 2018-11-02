<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<title>Expéditions pour les projets Chronopost - Tri par date d'envoi croissante</title>
			</head>
			<body>
					<div id="titre">
				<table border="3"  cellspacing="4" cellpadding="2" align="center">
					<caption align="center">
						Tri par date d'envoi croissante
					</caption>
					<colgroup>
						<col style="width:80px"  />
						<col style="width:70px"  />
						<col style="width:240px"  />
						<col style="width:80px"  />
						<col style="width:10px"  />
						<col style="width:80px"  />
						<col style="width:240px"  />
						<col style="width:120px"  />
					</colgroup>
					<tr>
						<th id="glpi" abbr="glpi">Dossier</th>
						<th id="env" abbr="env">Envoi</th>
						<th id="proj" abbr="proj">Projet</th>
						<th id="lieu" abbr="lieu">Ville</th>
						<th id="qte">Qté</th>
						<th id="ref" abbr="ref">Référence</th>
						<th id="lib" abbr="lib">Désignation</th>
						<th id="dem" abbr="dem">Demandeur</th>
					</tr>
					</table>
					</div>
				<table border="3"  cellspacing="4" cellpadding="2" align="center">
					<colgroup>
						<col style="width:80px"  />
						<col style="width:70px"  />
						<col style="width:240px"  />
						<col style="width:80px"  />
						<col style="width:10px"  />
						<col style="width:80px"  />
						<col style="width:240px"  />
						<col style="width:120px"  />
					</colgroup>
					<xsl:for-each select="projets/article">
					<xsl:sort select="env" order="ascending" />
						<tr>
							<xsl:if test="position() mod 2 != 1">
								<xsl:attribute name="class">pair
								</xsl:attribute>
							</xsl:if>
							<xsl:if test="position() mod 2 != 0">
								<xsl:attribute name="class">impair
								</xsl:attribute>
							</xsl:if>
							<td class="char">
								<xsl:element name="a">
									<xsl:attribute name="target">blank</xsl:attribute>
									<xsl:attribute name="href">http://glpi.telintrans.fr/front/ticket.form.php?id=<xsl:value-of select="glpi"/>
									</xsl:attribute>
									<xsl:value-of select="glpi"/>
								</xsl:element>
							</td>
							<td><xsl:value-of select="env"/></td>
							<td><xsl:value-of select="proj"/></td>
							<td><xsl:value-of select="lieu"/></td>
							<td class="char"><xsl:value-of select="qte"/></td>
							<td><xsl:value-of select="ref"/></td>
							<td><xsl:value-of select="lib"/></td>
							<td><xsl:value-of select="dem"/></td>

						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>