/// <reference path="__init__.ts"/>
module cherub {
    export module utils {
        export module assets {

            /* Validate the existence of an asset and continue / fail */
            export function validate(url:string):boolean {
                var http = new XMLHttpRequest();
                http.open('HEAD', url, false);
                http.send();
                return http.status == 200;
            }
        }
    }
}
