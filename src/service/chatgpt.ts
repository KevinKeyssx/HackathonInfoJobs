import { Configuration, OpenAIApi } from 'openai';
import { OPENIA_KEY } from '$env/static/private';

export class ChatGPTService {
    private readonly OPENIA_KEY = OPENIA_KEY;

    #getQueryParams( params: string, key: string ) {
        const queryParams = new URLSearchParams(params.split('?')[1]);
        return queryParams.get( key );
    }

    async createComplition( url: string ) {

        const prompt = this.#getQueryParams( url, 'description' );

        const configuration = new Configuration({
            apiKey: this.OPENIA_KEY,
        });

        const openai = new OpenAIApi( configuration );

        return await openai.createCompletion({
            model   : "text-davinci-003",
            prompt  : `Comportate como si fueras un evaluador de descripciones de puestos de trabajo, tienes que puntuarlas del 0 al 5 donde 0 es muy mala y 5 es excelente y dar observaciones de como mejorarla,
            tienes que fijarte en la claridad de la descripción, que sea fácil de entender, que sea fácil de leer, que no tenga errores de ortografía,
            prioriza en que tenga no tenga ningún otro contexto que no sea el puesto de trabajo y que tiene que decir exactamente lo que se necesita para el puesto de trabajo mientras más información exista en esto suma más puntos en la puntuación,
            no está demá que se mencione la empresa pero sea muy breve y que sea motivacional,
            como recomendación indica que no es necesario ingresar la información de la empresa, ni los beneficios que entrega, ni el salario ya que esta información se ingresa en otros campos si agrega estos puntos baja el puntaje de stars,
            lo importante es la función y los roles que debe realizar en el puesto de trabajo
            ejemplo "${prompt}"
            Tu respuesta debe ser 
            {
            "stars": 0,
            "message": "tus observaciones de la descripción y una sugerencia de como megorarla"
            }
            El valor de stars dependerá de lo dicho anteriormente, y el valor de message serán tus observaciones con respecto a la descripción del puesto y una sugerencia de como mejorarla
            solo debes responder en este formato tanto en inglés como en español:
            {
            "stars": 0,
            "message": "tus observaciones de la descripción y una sugerencia de como megorarla"
            } `,
            max_tokens: 1000,
            temperature: 0,
        });
    }

}