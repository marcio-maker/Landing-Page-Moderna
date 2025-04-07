from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/contato', methods=['POST'])
def contato():
    try:
        dados = request.get_json()
        
        # Validação simples
        if not dados or 'nome' not in dados or 'email' not in dados or 'mensagem' not in dados:
            return jsonify({'sucesso': False, 'erro': 'Dados incompletos'}), 400
        
        # Aqui você pode:
        # 1. Salvar no banco de dados
        # 2. Enviar email
        # 3. Processar a mensagem
        
        print(f"Mensagem recebida de {dados['nome']} ({dados['email']}): {dados['mensagem']}")
        
        return jsonify({
            'sucesso': True,
            'mensagem': 'Mensagem recebida com sucesso!'
        })
        
    except Exception as e:
        return jsonify({
            'sucesso': False,
            'erro': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)