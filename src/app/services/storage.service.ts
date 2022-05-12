import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _storage: Storage;

    constructor(private storage: Storage) { }

    async checkStorage(): Promise<void> {
        if (!this._storage) {
            this._storage = await this.storage.create();
        }
    }

    async get(key: string): Promise<any> {
        await this.checkStorage();
        return await this._storage?.get(key);
    }

    async set(key: string, value: any): Promise<any> {
        await this.checkStorage();
        return await this._storage?.set(key, value);
    }

    async remove(key: string): Promise<any> {
        await this.checkStorage();
        return await this._storage?.remove(key);
    }

    async clearAll(): Promise<any> {
        await this.checkStorage();
        return await this._storage?.clear();
    }
}