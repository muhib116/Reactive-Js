import { createComponent} from '../reactiveJs/index.js'

export default createComponent(
`
    <template>
        <div class="max-w-sm bg-white text-4xl border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            Components of Logo
        </div>
    </template>
    
    <script type="module">
        console.log('I\'m from logo component')
    </script>
`
)