import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Workstation } from './models/workstation';
import { Forecast } from './models/forecast';
import { Article } from './models/article';
import { FutureInwardStockMovement } from './models/futureInwardStockMovement';
import { Queue } from './models/queue';
import { Capacity } from './models/capacity';
import { Order } from './models/order';
import { Purchase } from './models/purchase';
import { BillOfMaterials } from './models/billOfMaterials';
import { DirectSales } from './models/directSales';
import { StrategicData } from './models/strategicData';
import { IdleTimeCost } from './models/idleTimeCost';

@Injectable({
  providedIn: 'root',
})
export class ProdPlanToolService {
  private workstationsUrl = 'api/workstations'; // URL to web api
  private forecastsUrl = 'api/forecasts';
  private articlesUrl = 'api/articles';
  private futureInwardStockMovementsUrl = 'api/futureInwardStockMovements';
  private queuesUrl = 'api/queues';
  private capacitiesUrl = 'api/capacities';
  private ordersUrl = 'api/orders';
  private purchasesUrl = 'api/purchases';
  private billsOfMaterialsUrl = 'api/billsOfMaterials';
  private directSalesUrl = 'api/directSales';
  private strategicDatasUrl = 'api/strategicDatas';
  private idleTimeCostsUrl = 'api/idleTimeCosts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET workstations from the server */
  getWorkstations(): Observable<Workstation[]> {
    return this.http.get<Workstation[]>(this.workstationsUrl).pipe(
      tap((_) => console.log('fetched workstations')),
      catchError(this.handleError<Workstation[]>('getWorkstations', []))
    );
  }

  /** GET forecasts from the server */
  getForecasts(): Observable<Forecast[]> {
    return this.http.get<Forecast[]>(this.forecastsUrl).pipe(
      tap((_) => console.log('fetched forecasts')),
      catchError(this.handleError<Forecast[]>('getForecasts', []))
    );
  }

  /** GET articles from the server */
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl).pipe(
      tap((_) => console.log('fetched articles')),
      catchError(this.handleError<Article[]>('getArticles', []))
    );
  }

  /** GET future inward stock movements from the server */
  getFutureInwardStockMovements(): Observable<FutureInwardStockMovement[]> {
    return this.http
      .get<FutureInwardStockMovement[]>(this.futureInwardStockMovementsUrl)
      .pipe(
        tap((_) => console.log('fetched future inward stock movements')),
        catchError(
          this.handleError<FutureInwardStockMovement[]>(
            'getFutureInwardStockMovements',
            []
          )
        )
      );
  }

  /** GET queues from the server */
  getQueues(): Observable<Queue[]> {
    return this.http.get<Queue[]>(this.queuesUrl).pipe(
      tap((_) => console.log('fetched queues')),
      catchError(this.handleError<Queue[]>('getQueues', []))
    );
  }

  /** GET capacities from the server */
  getCapacities(): Observable<Capacity[]> {
    return this.http.get<Capacity[]>(this.capacitiesUrl).pipe(
      tap((_) => console.log('fetched capacities')),
      catchError(this.handleError<Capacity[]>('getCapacities', []))
    );
  }

  /** GET orders from the server */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      tap((_) => console.log('fetched orders')),
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  /** GET purchases from the server */
  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.purchasesUrl).pipe(
      tap((_) => console.log('fetched purchases')),
      catchError(this.handleError<Purchase[]>('getPurchases', []))
    );
  }

  /** GET bills of materials from the server */
  getBillsOfMaterials(): Observable<BillOfMaterials[]> {
    return this.http.get<BillOfMaterials[]>(this.billsOfMaterialsUrl).pipe(
      tap((_) => console.log('fetched bills of materials')),
      catchError(this.handleError<BillOfMaterials[]>('getBillsOfMaterials', []))
    );
  }

  /** GET direct sales from the server */
  getDirectSales(): Observable<DirectSales[]> {
    return this.http.get<DirectSales[]>(this.directSalesUrl).pipe(
      tap((_) => console.log('fetched direct sales')),
      catchError(this.handleError<DirectSales[]>('getDirectSales', []))
    );
  }

  /** GET strategic datas from the server */
  getStrategicDatas(): Observable<StrategicData[]> {
    return this.http.get<StrategicData[]>(this.strategicDatasUrl).pipe(
      tap((_) => console.log('fetched strategic datas')),
      catchError(this.handleError<StrategicData[]>('getStrategicDatas', []))
    );
  }

  /** GET idle time costs from the server */
  getIdleTimeCosts(): Observable<IdleTimeCost[]> {
    return this.http.get<IdleTimeCost[]>(this.idleTimeCostsUrl).pipe(
      tap((_) => console.log('fetched idle time costs')),
      catchError(this.handleError<IdleTimeCost[]>('getIdleTimeCosts', []))
    );
  }

  /** GET workstation by id. Will 404 if id not found */
  getWorkstation(id: number): Observable<Workstation> {
    const url = `${this.workstationsUrl}/${id}`;

    return this.http.get<Workstation>(url).pipe(
      tap((_) => console.log(`fetched workstation id=${id}`)),
      catchError(this.handleError<Workstation>(`getWorkstation id=${id}`))
    );
  }

  /** GET forecast by id. Will 404 if id not found */
  getForecast(id: number): Observable<Forecast> {
    const url = `${this.forecastsUrl}/${id}`;

    return this.http.get<Forecast>(url).pipe(
      tap((_) => console.log(`fetched forecast id=${id}`)),
      catchError(this.handleError<Forecast>(`getForecast id=${id}`))
    );
  }

  /** GET article by id. Will 404 if id not found */
  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;

    return this.http.get<Article>(url).pipe(
      tap((_) => console.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  /** GET future inward stock movement by id. Will 404 if id not found */
  getFutureInwardStockMovement(
    id: number
  ): Observable<FutureInwardStockMovement> {
    const url = `${this.futureInwardStockMovementsUrl}/${id}`;

    return this.http.get<FutureInwardStockMovement>(url).pipe(
      tap((_) => console.log(`fetched future inward stock movement id=${id}`)),
      catchError(
        this.handleError<FutureInwardStockMovement>(
          `getFutureInwardStockMovement id=${id}`
        )
      )
    );
  }

  /** GET queue by id. Will 404 if id not found */
  getQueue(id: number): Observable<Queue> {
    const url = `${this.queuesUrl}/${id}`;

    return this.http.get<Queue>(url).pipe(
      tap((_) => console.log(`fetched queue id=${id}`)),
      catchError(this.handleError<Queue>(`getQueue id=${id}`))
    );
  }

  /** GET capacity by id. Will 404 if id not found */
  getCapacity(id: number): Observable<Capacity> {
    const url = `${this.capacitiesUrl}/${id}`;

    return this.http.get<Capacity>(url).pipe(
      tap((_) => console.log(`fetched capacity id=${id}`)),
      catchError(this.handleError<Capacity>(`getCapacity id=${id}`))
    );
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;

    return this.http.get<Order>(url).pipe(
      tap((_) => console.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  /** GET purchase by id. Will 404 if id not found */
  getPurchase(id: number): Observable<Purchase> {
    const url = `${this.purchasesUrl}/${id}`;

    return this.http.get<Purchase>(url).pipe(
      tap((_) => console.log(`fetched purchase id=${id}`)),
      catchError(this.handleError<Purchase>(`getPurchase id=${id}`))
    );
  }

  /** GET bill of materials by id. Will 404 if id not found */
  getBillOfMaterials(id: number): Observable<BillOfMaterials> {
    const url = `${this.billsOfMaterialsUrl}/${id}`;

    return this.http.get<BillOfMaterials>(url).pipe(
      tap((_) => console.log(`fetched bill of materials id=${id}`)),
      catchError(
        this.handleError<BillOfMaterials>(`getBillOfMaterials id=${id}`)
      )
    );
  }

  /** GET direct sale by id. Will 404 if id not found */
  getDirectSale(id: number): Observable<DirectSales> {
    const url = `${this.directSalesUrl}/${id}`;

    return this.http.get<DirectSales>(url).pipe(
      tap((_) => console.log(`fetched direct sale id=${id}`)),
      catchError(this.handleError<DirectSales>(`getDirectSale id=${id}`))
    );
  }

  /** GET strategic data by id. Will 404 if id not found */
  getStrategicData(id: number): Observable<StrategicData> {
    const url = `${this.strategicDatasUrl}/${id}`;

    return this.http.get<StrategicData>(url).pipe(
      tap((_) => console.log(`fetched strategic data id=${id}`)),
      catchError(this.handleError<StrategicData>(`getStrategicData id=${id}`))
    );
  }

  /** GET idle time cost by id. Will 404 if id not found */
  getIdleTimeCost(id: number): Observable<IdleTimeCost> {
    const url = `${this.idleTimeCostsUrl}/${id}`;

    return this.http.get<IdleTimeCost>(url).pipe(
      tap((_) => console.log(`fetched idle time cost id=${id}`)),
      catchError(this.handleError<IdleTimeCost>(`getIdleTimeCost id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new workstation to the server */
  addWorkstation(workstation: Workstation): Observable<Workstation> {
    return this.http
      .post<Workstation>(this.workstationsUrl, workstation, this.httpOptions)
      .pipe(
        tap((newWorkstation: Workstation) =>
          console.log(`added workstation w/ id=${newWorkstation.id}`)
        ),
        catchError(this.handleError<Workstation>('addWorkstation'))
      );
  }

  /** POST: add a new forecast to the server */
  addForecast(forecast: Forecast): Observable<Forecast> {
    return this.http
      .post<Forecast>(this.forecastsUrl, forecast, this.httpOptions)
      .pipe(
        tap((newForecast: Forecast) =>
          console.log(`added forecast w/ id=${newForecast.id}`)
        ),
        catchError(this.handleError<Forecast>('addForecast'))
      );
  }

  /** POST: add a new article to the server */
  addArticle(article: Article): Observable<Article> {
    return this.http
      .post<Article>(this.articlesUrl, article, this.httpOptions)
      .pipe(
        tap((newArticle: Article) =>
          console.log(`added article w/ id=${newArticle.id}`)
        ),
        catchError(this.handleError<Article>('addArticle'))
      );
  }

  /** POST: add a new future inward stock movement to the server */
  addFutureInwardStockMovement(
    futureInwardStockMovement: FutureInwardStockMovement
  ): Observable<FutureInwardStockMovement> {
    return this.http
      .post<FutureInwardStockMovement>(
        this.futureInwardStockMovementsUrl,
        futureInwardStockMovement,
        this.httpOptions
      )
      .pipe(
        tap((newFutureInwardStockMovement: FutureInwardStockMovement) =>
          console.log(
            `added future inward stock movement w/ id=${newFutureInwardStockMovement.id}`
          )
        ),
        catchError(
          this.handleError<FutureInwardStockMovement>(
            'addFutureInwardStockMovement'
          )
        )
      );
  }

  /** POST: add a new queue to the server */
  addQueue(queue: Queue): Observable<Queue> {
    return this.http.post<Queue>(this.queuesUrl, queue, this.httpOptions).pipe(
      tap((newQueue: Queue) => console.log(`added queue w/ id=${newQueue.id}`)),
      catchError(this.handleError<Queue>('addQueue'))
    );
  }

  /** POST: add a new capacity to the server */
  addCapacity(capacity: Capacity): Observable<Capacity> {
    return this.http
      .post<Capacity>(this.capacitiesUrl, capacity, this.httpOptions)
      .pipe(
        tap((newCapacity: Capacity) =>
          console.log(`added capacity w/ id=${newCapacity.id}`)
        ),
        catchError(this.handleError<Capacity>('addCapacity'))
      );
  }

  /** POST: add a new order to the server */
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, this.httpOptions).pipe(
      tap((newOrder: Order) => console.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /** POST: add a new purchase to the server */
  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http
      .post<Purchase>(this.purchasesUrl, purchase, this.httpOptions)
      .pipe(
        tap((newPurchase: Purchase) =>
          console.log(`added purchase w/ id=${newPurchase.id}`)
        ),
        catchError(this.handleError<Purchase>('addPurchase'))
      );
  }

  /** POST: add a new bill of materials to the server */
  addBillOfMaterials(
    billOfMaterials: BillOfMaterials
  ): Observable<BillOfMaterials> {
    return this.http
      .post<BillOfMaterials>(
        this.billsOfMaterialsUrl,
        billOfMaterials,
        this.httpOptions
      )
      .pipe(
        tap((newBillOfMaterials: BillOfMaterials) =>
          console.log(`added bill of materials w/ id=${newBillOfMaterials.id}`)
        ),
        catchError(this.handleError<BillOfMaterials>('addBillOfMaterials'))
      );
  }

  /** POST: add a new direct sale to the server */
  addDirectSale(directSale: DirectSales): Observable<DirectSales> {
    return this.http
      .post<DirectSales>(this.directSalesUrl, directSale, this.httpOptions)
      .pipe(
        tap((newDirectSales: DirectSales) =>
          console.log(`added directSale w/ id=${newDirectSales.id}`)
        ),
        catchError(this.handleError<DirectSales>('addDirectSale'))
      );
  }

  /** POST: add a new strategic data to the server */
  addStrategicData(strategicData: StrategicData): Observable<StrategicData> {
    return this.http
      .post<StrategicData>(
        this.strategicDatasUrl,
        strategicData,
        this.httpOptions
      )
      .pipe(
        tap((newStrategicData: StrategicData) =>
          console.log(`added strategic data w/ id=${newStrategicData.id}`)
        ),
        catchError(this.handleError<StrategicData>('addStrategicData'))
      );
  }

  /** POST: add a new idle time cost to the server */
  addIdleTimeCost(idleTimeCost: IdleTimeCost): Observable<IdleTimeCost> {
    return this.http
      .post<IdleTimeCost>(this.idleTimeCostsUrl, idleTimeCost, this.httpOptions)
      .pipe(
        tap((newIdleTimeCost: IdleTimeCost) =>
          console.log(`added idle time cost w/ id=${newIdleTimeCost.id}`)
        ),
        catchError(this.handleError<IdleTimeCost>('addIdleTimeCost'))
      );
  }

  /** DELETE: delete the workstation from the server */
  deleteWorkstation(id: number): Observable<Workstation> {
    const url = `${this.workstationsUrl}/${id}`;

    return this.http.delete<Workstation>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted workstation id=${id}`)),
      catchError(this.handleError<Workstation>('deleteWorkstation'))
    );
  }

  /** DELETE: delete the forecast from the server */
  deleteForecast(id: number): Observable<Forecast> {
    const url = `${this.forecastsUrl}/${id}`;

    return this.http.delete<Forecast>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted forecast id=${id}`)),
      catchError(this.handleError<Forecast>('deleteForecast'))
    );
  }

  /** DELETE: delete the article from the server */
  deleteArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;

    return this.http.delete<Article>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }

  /** DELETE: delete the future inward stock movement from the server */
  deleteFutureInwardStockMovement(
    id: number
  ): Observable<FutureInwardStockMovement> {
    const url = `${this.futureInwardStockMovementsUrl}/${id}`;

    return this.http
      .delete<FutureInwardStockMovement>(url, this.httpOptions)
      .pipe(
        tap((_) =>
          console.log(`deleted future inward stock movement id=${id}`)
        ),
        catchError(
          this.handleError<FutureInwardStockMovement>(
            'deleteFutureInwardStockMovement'
          )
        )
      );
  }

  /** DELETE: delete the queue from the server */
  deleteQueue(id: number): Observable<Queue> {
    const url = `${this.queuesUrl}/${id}`;

    return this.http.delete<Queue>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted queue id=${id}`)),
      catchError(this.handleError<Queue>('deleteQueue'))
    );
  }

  /** DELETE: delete the capacity from the server */
  deleteCapacity(id: number): Observable<Capacity> {
    const url = `${this.capacitiesUrl}/${id}`;

    return this.http.delete<Capacity>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted capacity id=${id}`)),
      catchError(this.handleError<Capacity>('deleteCapacity'))
    );
  }

  /** DELETE: delete the order from the server */
  deleteOrder(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;

    return this.http.delete<Order>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
    );
  }

  /** DELETE: delete the purchase from the server */
  deletePurchase(id: number): Observable<Purchase> {
    const url = `${this.purchasesUrl}/${id}`;

    return this.http.delete<Purchase>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted purchase id=${id}`)),
      catchError(this.handleError<Purchase>('deletePurchase'))
    );
  }

  /** DELETE: delete the bill of materials from the server */
  deleteBillOfMaterials(id: number): Observable<BillOfMaterials> {
    const url = `${this.billsOfMaterialsUrl}/${id}`;

    return this.http.delete<BillOfMaterials>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted bill of materials id=${id}`)),
      catchError(this.handleError<BillOfMaterials>('deleteBillOfMaterials'))
    );
  }

  /** DELETE: delete the direct sale from the server */
  deleteDirectSale(id: number): Observable<DirectSales> {
    const url = `${this.directSalesUrl}/${id}`;

    return this.http.delete<DirectSales>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted directSale id=${id}`)),
      catchError(this.handleError<DirectSales>('deleteDirectSale'))
    );
  }

  /** DELETE: delete the strategic data from the server */
  deleteStrategicData(id: number): Observable<StrategicData> {
    const url = `${this.strategicDatasUrl}/${id}`;

    return this.http.delete<StrategicData>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted strategic data id=${id}`)),
      catchError(this.handleError<StrategicData>('deleteStrategicData'))
    );
  }

  /** PUT: update the workstation on the server */
  updateWorkstation(workstation: Workstation): Observable<any> {
    return this.http
      .put(this.workstationsUrl, workstation, this.httpOptions)
      .pipe(
        tap((_) => console.log(`updated workstation id=${workstation.id}`)),
        catchError(this.handleError<any>('updateWorkstation'))
      );
  }

  /** DELETE: delete the idle time cost from the server */
  deleteIdleTimeCost(id: number): Observable<IdleTimeCost> {
    const url = `${this.idleTimeCostsUrl}/${id}`;

    return this.http.delete<IdleTimeCost>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted idle time cost id=${id}`)),
      catchError(this.handleError<IdleTimeCost>('deleteIdleTimeCost'))
    );
  }

  /** PUT: update the forecast on the server */
  updateForecast(forecast: Forecast): Observable<any> {
    return this.http.put(this.forecastsUrl, forecast, this.httpOptions).pipe(
      tap((_) => console.log(`updated forecast id=${forecast.id}`)),
      catchError(this.handleError<any>('updateForecast'))
    );
  }

  /** PUT: update the article on the server */
  updateArticle(article: Article): Observable<any> {
    return this.http.put(this.articlesUrl, article, this.httpOptions).pipe(
      tap((_) => console.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  /** PUT: update the future inward stock movement on the server */
  updateFutureInwardStockMovement(
    futureInwardStockMovement: FutureInwardStockMovement
  ): Observable<any> {
    return this.http
      .put(
        this.futureInwardStockMovementsUrl,
        futureInwardStockMovement,
        this.httpOptions
      )
      .pipe(
        tap((_) =>
          console.log(
            `updated future inward stock movement id=${futureInwardStockMovement.id}`
          )
        ),
        catchError(this.handleError<any>('updateFutureInwardStockMovement'))
      );
  }

  /** PUT: update the queue on the server */
  updateQueue(queue: Queue): Observable<any> {
    return this.http.put(this.queuesUrl, queue, this.httpOptions).pipe(
      tap((_) => console.log(`updated queue id=${queue.id}`)),
      catchError(this.handleError<any>('updateQueue'))
    );
  }

  /** PUT: update the capacity on the server */
  updateCapacity(capacity: Capacity): Observable<any> {
    return this.http.put(this.capacitiesUrl, capacity, this.httpOptions).pipe(
      tap((_) => console.log(`updated capacity id=${capacity.id}`)),
      catchError(this.handleError<any>('updateCapacity'))
    );
  }

  /** PUT: update the order on the server */
  updateOrder(order: Order): Observable<any> {
    return this.http.put(this.ordersUrl, order, this.httpOptions).pipe(
      tap((_) => console.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  /** PUT: update the purchase on the server */
  updatePurchase(purchase: Purchase): Observable<any> {
    return this.http.put(this.purchasesUrl, purchase, this.httpOptions).pipe(
      tap((_) => console.log(`updated purchase id=${purchase.id}`)),
      catchError(this.handleError<any>('updatePurchase'))
    );
  }

  /** PUT: update the bill of materials on the server */
  updateBillOfMaterials(billOfMaterials: BillOfMaterials): Observable<any> {
    return this.http
      .put(this.billsOfMaterialsUrl, billOfMaterials, this.httpOptions)
      .pipe(
        tap((_) =>
          console.log(`updated bill of materials id=${billOfMaterials.id}`)
        ),
        catchError(this.handleError<any>('updateBillOfMaterials'))
      );
  }

  /** PUT: update the direct sale on the server */
  updateDirectSale(directSale: DirectSales): Observable<any> {
    return this.http
      .put(this.directSalesUrl, directSale, this.httpOptions)
      .pipe(
        tap((_) => console.log(`updated directSale id=${directSale.id}`)),
        catchError(this.handleError<any>('updateDirectSale'))
      );
  }

  /** PUT: update the strategic data on the server */
  updateStrategicData(strategicData: StrategicData): Observable<any> {
    return this.http
      .put(this.strategicDatasUrl, strategicData, this.httpOptions)
      .pipe(
        tap((_) =>
          console.log(`updated strategic data id=${strategicData.id}`)
        ),
        catchError(this.handleError<any>('updateStrategicData'))
      );
  }

  /** PUT: update the idle time cost on the server */
  updateIdleTimeCost(idleTimeCost: IdleTimeCost): Observable<any> {
    return this.http
      .put(this.idleTimeCostsUrl, idleTimeCost, this.httpOptions)
      .pipe(
        tap((_) => console.log(`updated idle time cost id=${idleTimeCost.id}`)),
        catchError(this.handleError<any>('updateIdleTimeCost'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
