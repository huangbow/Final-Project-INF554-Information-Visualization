def main():
	revenue = {}
	expend = {}
	loaddata("02.csv",revenue,expend)
	loaddata("03.csv",revenue,expend)
	loaddata("04.csv",revenue,expend)
	loaddata("05.csv",revenue,expend)
	loaddata("06.csv",revenue,expend)
	loaddata("07.csv",revenue,expend)
	loaddata("08.csv",revenue,expend)
	loaddata("09.csv",revenue,expend)
	loaddata("10.csv",revenue,expend)
	loaddata("11.csv",revenue,expend)
	loaddata("12.csv",revenue,expend)
	print revenue
	print expend
# 	data = open("03.csv")
# 	# routefile = open('busposition.json','w')
# 	# info = {}
# 	for line in data:
# 		pieces = line.strip().split("\r")
# 	# print pieces
# 	res = []
# 	for item in pieces:
# 		p = item.strip().split(",")
# 		index = 0
# 		for c in p[0]:
# 			if c != ".":
# 				index += 1
# 		p[0] = p[0][0:index]
# 		p[1] = p[1][0:-1]
# 		res.append(p)
# 	print res

	revenuefile = open('revenue.json','w')
	revenuefile.write('''[
''')
	count = 1
	for country in revenue:

	
		revenuefile.write('''	{
	\"country\":\"%s\",
	\"YR2002\":\"%s\",
	\"YR2003\":\"%s\",
	\"YR2004\":\"%s\",
	\"YR2005\":\"%s\",
	\"YR2006\":\"%s\",
	\"YR2007\":\"%s\",
	\"YR2008\":\"%s\",
	\"YR2009\":\"%s\",
	\"YR2010\":\"%s\",
	\"YR2011\":\"%s\",
	\"YR2012\":\"%s\"
	}'''%(country,revenue[country][0],revenue[country][1],revenue[country][2],revenue[country][3],revenue[country][4],revenue[country][5],revenue[country][6],revenue[country][7],revenue[country][8],revenue[country][9],revenue[country][10]))
		if count<len(revenue):
			revenuefile.write(',\n')
		else:
			revenuefile.write('\n')
		count += 1
	revenuefile.write(']')
	revenuefile.close()

	expendfile = open('expend.json','w')
	expendfile.write('''[
''')
	count = 1
	for country in expend:

	
		expendfile.write('''	{
	\"country\":\"%s\",
	\"YR2002\":\"%s\",
	\"YR2003\":\"%s\",
	\"YR2004\":\"%s\",
	\"YR2005\":\"%s\",
	\"YR2006\":\"%s\",
	\"YR2007\":\"%s\",
	\"YR2008\":\"%s\",
	\"YR2009\":\"%s\",
	\"YR2010\":\"%s\",
	\"YR2011\":\"%s\",
	\"YR2012\":\"%s\"
	}'''%(country,expend[country][0],expend[country][1],expend[country][2],expend[country][3],expend[country][4],expend[country][5],expend[country][6],expend[country][7],expend[country][8],expend[country][9],expend[country][10]))
		if count<len(expend):
			expendfile.write(',\n')
		else:
			expendfile.write('\n')
		count += 1
	expendfile.write(']')
	expendfile.close()

# 	data.close()

def loaddata(filename,revenue,expend):
	data = open(filename)
	# routefile = open('busposition.json','w')
	# info = {}
	for line in data:
		pieces = line.strip().split("\r")
	# print pieces
	for item in pieces:
		p = item.strip().split(",")
		index = 0
		for c in p[0]:
			if c != ".":
				index += 1
		p[0] = p[0][0:index]
		p[1] = p[1][0:-1]
		if p[0] not in revenue:
			revenue.setdefault(p[0], [])
			revenue[p[0]].append(p[1])
		else:
			revenue[p[0]].append(p[1])
		if p[0] not in expend:
			expend.setdefault(p[0], [])
			expend[p[0]].append(p[2])
		else:
			expend[p[0]].append(p[2])
	data.close()
	# return revenue,expend

# def update(filename,year):
# 	data = open(filename)
# 	# routefile = open('busposition.json','w')
# 	# info = {}
# 	for line in data:
# 		pieces = line.strip().split("\r")
# 	# print pieces
# 	revenue = {}
# 	expend = {}
# 	for item in pieces:
# 		p = item.strip().split(",")
# 		index = 0
# 		for c in p[0]:
# 			if c != ".":
# 				index += 1
# 		p[0] = p[0][0:index]
# 		p[1] = p[1][0:-1]
# 		revenue.append([p[0],p[1]])
# 		expend.append([p[0],p[2]])
# 	data.close()
# 	return revenue,expend

	


if __name__ == '__main__':
	main()