



text = ''
with open('./list.json') as file:
    for line in file:
        text = text + line

print(text)
new_text = text.replace('"link": "https://wintersunset95.github.io/UnitySongBook', '"link": require("../assets')

output = open('./output.json', 'w')
output.write(new_text)
