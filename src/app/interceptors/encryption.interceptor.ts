import { inject } from '@angular/core';
import {
    HttpResponse,
    HttpInterceptorFn
} from '@angular/common/http';
import { map } from 'rxjs';
import { CryptoService } from '../services/crypto.service';

export const cryptoInterceptor: HttpInterceptorFn = (req, next) => {
    const cryptoService = inject(CryptoService);
    let clonedReq = req;

    // 1. Encrypt outgoing request body (if applicable)
    if (req.body) {
        const encryptedBody = cryptoService.encryptPayload(req.body);

        clonedReq = req.clone({
            setHeaders: { 'Content-Type': 'application/json' },
            body: { payload: encryptedBody }
        });
    }

    // 2. Pass the modified request to the next handler and handle the response
    return next(clonedReq).pipe(
        // 3. Decrypt incoming response body (if applicable)
        // You'll need to adapt this based on how your backend sends encrypted responses
        map(event => {
            if (
                event instanceof HttpResponse &&
                typeof event.body === 'object' &&
                event.body !== null &&
                'payload' in event.body
            ) {
                try {
                    const decrypted = cryptoService.decryptPayload((event.body as { payload: string }).payload);
                    return event.clone({ body: decrypted }); // Replace with decrypted data
                } catch (e) {
                    console.error('Decryption failed:', e);
                }
            }
            return event;
        })
    );
};
