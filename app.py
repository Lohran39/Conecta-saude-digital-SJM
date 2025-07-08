import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app) # Habilita CORS para permitir requisições do frontend

# Configura a chave da API do Google Gemini
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY não encontrada no arquivo .env")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro') # Ou o modelo que você preferir

@app.route('/')
def home():
    return "Backend da IA Conecta Saúde SJM está rodando!"

@app.route('/analisar_sintomas', methods=['POST'])
def analisar_sintomas():
    try:
        data = request.get_json()
        sintomas = data.get('sintomas')

        if not sintomas:
            return jsonify({"error": "Sintomas não fornecidos."}), 400

        # Adiciona uma instrução para a IA para garantir que a resposta seja informativa e não diagnóstica
        prompt = f"""
        Você é um assistente de saúde virtual para a cidade de São João de Meriti.
        Sua função é fornecer informações preliminares e conselhos gerais de saúde baseados em sintomas descritos,
        MAS VOCÊ NÃO DEVE DIAGNOSTICAR OU SUBSTITUIR UM MÉDICO.
        SEMPRE inclua um aviso claro de que a informação é informativa e que um profissional de saúde deve ser consultado.
        Sempre inclua também a instrução para ligar 192 (SAMU) ou 193 (Bombeiros) em caso de emergência.

        Sintomas descritos: "{sintomas}"

        Com base nestes sintomas, forneça uma orientação preliminar.
        """

        response = model.generate_content(prompt)

        return jsonify({"analise_ia": response.text})

    except Exception as e:
        print(f"Erro no backend: {e}")
        return jsonify({"error": "Erro interno do servidor ao processar os sintomas."}), 500

if __name__ == '__main__':
    # Para rodar localmente, certifique-se de que o backend esteja acessível para o frontend
    # O frontend está tentando acessar http://127.0.0.1:5000/analisar_sintomas
    app.run(debug=True, host='127.0.0.1', port=5000)