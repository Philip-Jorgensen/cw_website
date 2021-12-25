from website import create_app

# This is a test for whether it will update on the website

if __name__ == '__main__':
    app = create_app()
    app.run(debug = True)