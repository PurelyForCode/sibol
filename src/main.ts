import { app } from './express.js'

function main() {
    app.listen(3000, 'localhost', () => {
        console.log('running on 3000')
    })
}

main()
