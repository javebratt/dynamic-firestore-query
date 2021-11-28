import { Component } from '@angular/core';
import {
  collection,
  Firestore,
  query,
  Query,
  QueryConstraint,
  where,
  collectionData,
  WhereFilterOp,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  foodItems$: Observable<FoodItem[]> = this.getFoodList([]);
  constructor(private firestore: Firestore) {}

  getFoodList(queryList: FirestoreQuery[]): Observable<any[]> {
    const queryConditions: QueryConstraint[] = queryList.map((condition) =>
      where(condition.property, condition.operator, condition.value)
    );

    const queryToPerform: Query<DocumentData> = query(
      collection(this.firestore, 'foodList'),
      ...queryConditions
    );

    return collectionData(queryToPerform);
  }
}

interface FirestoreQuery {
  property: string;
  operator: WhereFilterOp; // "<" | "<=" | "==" | "!=" | ">=" | ">" | "array-contains" | "in" | "array-contains-any" | "not-in"
  value: unknown;
}

interface FoodItem {
  name: string;
  rate: number;
}
