# import torch
# from transformers import T5Tokenizer, T5ForConditionalGeneration, T5Config


# # initialize the pretrained model
# model = T5ForConditionalGeneration.from_pretrained('t5-small')
# tokenizer = T5Tokenizer.from_pretrained('t5-small')
# device = torch.device('cpu')


# # input text
# # text = """
# # Back in the 1950s, the fathers of the field, Minsky and McCarthy, described artificial intelligence as any task performed by a machine that would have previously been considered to require human intelligence.

# # That's obviously a fairly broad definition, which is why you will sometimes see arguments over whether something is truly AI or not.

# # Modern definitions of what it means to create intelligence are more specific. Francois Chollet, an AI researcher at Google and creator of the machine-learning software library Keras, has said intelligence is tied to a system's ability to adapt and improvise in a new environment, to generalise its knowledge and apply it to unfamiliar scenarios.

# # "Intelligence is the efficiency with which you acquire new skills at tasks you didn't previously prepare for," he said.

# # "Intelligence is not skill itself; it's not what you can do; it's how well and how efficiently you can learn new things."

# # It's a definition under which modern AI-powered systems, such as virtual assistants, would be characterised as having demonstrated 'narrow AI', the ability to generalise their training when carrying out a limited set of tasks, such as speech recognition or computer vision.

# # Typically, AI systems demonstrate at least some of the following behaviours associated with human intelligence: planning, learning, reasoning, problem-solving, knowledge representation, perception, motion, and manipulation and, to a lesser extent, social intelligence and creativity.

# # AlexNet's performance demonstrated the power of learning systems based on neural networks, a model for machine learning that had existed for decades but that was finally realising its potential due to refinements to architecture and leaps in parallel processing power made possible by Moore's Law. The prowess of machine-learning systems at carrying out computer vision also hit the headlines that year, with Google training a system to recognise an internet favorite: pictures of cats.

# # The next demonstration of the efficacy of machine-learning systems that caught the public's attention was the 2016 triumph of the Google DeepMind AlphaGo AI over a human grandmaster in Go, an ancient Chinese game whose complexity stumped computers for decades. Go has about possible 200 moves per turn compared to about 20 in Chess. Over the course of a game of Go, there are so many possible moves that are searching through each of them in advance to identify the best play is too costly from a computational point of view. Instead, AlphaGo was trained how to play the game by taking moves played by human experts in 30 million Go games and feeding them into deep-learning neural networks.
# # """

# text ="""
# Virat Kohli (Hindi pronunciation: [ʋɪˈɾɑːʈ ˈkoːɦli] ⓘ; born 5 November 1988) is an Indian international cricketer and the former captain of the Indian national cricket team. He is a right-handed batsman and an occasional medium-fast bowler. He currently represents Royal Challengers Bengaluru in the IPL and Delhi in domestic cricket. Kohli is widely regarded as one of the greatest batsmen of all time.[3] He holds the record as the highest run-scorer in T20I and IPL, ranks third in ODI, and stands as the fourth-highest in international cricket.[4] He also holds the record for scoring the most centuries in ODI cricket and stands second in the list of most international centuries scored. Kohli was a key member of the Indian team that won the 2011 Cricket World Cup, 2013 ICC Champions Trophy, and captained India to win the ICC Test mace three consecutive times in 2017, 2018, and 2019.[5]

# In 2013, Kohli was ranked number one in the ICC rankings for ODI batsmen. In 2015, he achieved the summit of T20I rankings.[6] In 2018, he was ranked top Test batsman, making him the only Indian cricketer to hold the number one spot in all three formats of the game. He is the first player to score 20,000 runs in a decade. In 2020, the International Cricket Council named him the male cricketer of the decade.[7]

# He has received many accolades for his performances in cricket. He won the ICC ODI Player of the Year award four times in 2012, 2017, 2018, and 2023. He also won the Sir Garfield Sobers Trophy, given to the ICC Cricketer of the Year, on two occasions, in 2017 and 2018 respectively. In 2018, he became the first player to win both ICC ODI and Test Player of the Year awards in the same year. Also, he was named the Wisden Leading Cricketer in the World for three consecutive years, from 2016 to 2018. At the national level, Kohli was honoured with the Arjuna Award in 2013, the Padma Shri in 2017, and India's highest sporting honour, the Khel Ratna award, in 2018."""



# ## preprocess the input text
# preprocessed_text = text.strip().replace('\n','')
# t5_input_text = 'summarize: ' + preprocessed_text



# print(len(t5_input_text.split()))


# tokenized_text = tokenizer.encode(t5_input_text, return_tensors='pt', max_length=512).to(device)


# summary_ids = model.generate(tokenized_text, min_length=30, max_length=120)
# summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
# print("AAAAAAAAAAAAAAAA")
# print(summary)



import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration

# Initialize the pretrained model and tokenizer
model = T5ForConditionalGeneration.from_pretrained('t5-small')
tokenizer = T5Tokenizer.from_pretrained('t5-small')
device = torch.device('cpu')

# Read input text from txt1.txt
with open('txt1.txt', 'r',encoding='utf-8') as file:
    input_text = file.read()

# Preprocess the input text
preprocessed_text = input_text.strip().replace('\n', '')
t5_input_text = 'summarize: ' + preprocessed_text

# Tokenize the input text
tokenized_text = tokenizer.encode(t5_input_text, return_tensors='pt', max_length=1500).to(device)

# Generate summary
summary_ids = model.generate(tokenized_text, min_length=400, max_length=1200)
summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# Save the summary to txt2.txt
with open('txt2.txt', 'w') as file:
    file.write(summary)

print("Summary saved to txt2.txt")
