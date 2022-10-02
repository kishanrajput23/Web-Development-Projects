#include<stdio.h>
#include<string.h>

 int size;
  
 void display_board(int a[][size],int n)
{ int g,h;
  char ch[3]={'-','w','b'}; 
  for(g=0;g<size;g++)
  { 
    for(h=0;h<size;h++)
    { printf("%c",ch[a[g][h]]);
      printf(" ");
    }
    printf("\n");
  }
}

 int winning_condition(int a[][size],int n,int d)
 { int i,j;
   int c=0,f=0,e=0,g=0,k=0,m=0;

   if(d==1) 
  {
    for(j=0;j<n;j++)
    {
      if(a[n-1][j]==1)
      { f=1;
       break;
      }
    } 
    for(i=0;i<n;i++)
     {
       for(j=0;j<n;j++)
        {
          if(a[i][j]==2)
          {c++;
          break;    
          }
        }
     }
    for(i=0;i<n;i++)
    {
      for(j=0;j<n;j++)
      {
        if(a[i][j]==2)
        { e++;
          k=i;
          m=j;
          if(m==0 && (a[k-1][m]==1 || a[k-1][m]==2) && a[k-1][m+1]!=1)
          {g++;}
          else if(m==(n-1) && (a[k-1][m]==1 || a[k-1][m]==2) && a[k-1][m-1]!=1)
          {g++;}
          else if((a[k-1][m]==1 || a[k-1][m]==2) && a[k-1][m-1]!=1 && a[k-1][m+1]!=1)
          {g++;}
          else
          { }  
        }
      }
    }
    if ( c==0 || f==1 || (e==g) )
      {return (0);
      } 
  } 
  
  if(d==2)
  {
    for(j=0;j<n;j++)
    { 
      if(a[0][j]==2)
      { f=1;
       break;
      }
    }
    for(i=0;i<n;i++)
    {
      for(j=0;j<n;j++)
      {
        if(a[i][j]==1)
         {c++;
          break;
         }
      }
    }
    for(i=0;i<n;i++)
    {
      for(j=0;j<n;j++)
      {
        if(a[i][j]==1)
        { e++;
          k=i;
          m=j;
          if(m==0 && (a[k+1][m]==2 || a[k+1][m]==1) && a[k+1][m+1]!=2)
          {g++;}
          else if(m==(n-1) && (a[k+1][m]==2 || a[k+1][m]==1) && a[k+1][m-1]!=2)
          {g++;}
          else if((a[k+1][m]==2 || a[k+1][m]==1) && a[k+1][m-1]!=2 && a[k+1][m+1]!=2)
          {g++;}
          else
          { }
        }     
      }
    }
    if (c==0 || f==1 || (e==g))
    {return (0);
  
    }  
  }  
} 

 void move_maker(int a[][size],int n,int i,int j,char s[],int d)
{ int k,m;
  void swap(int k,int m,int e)
  { if(e==1)
    { a[k][m]=1;
      a[i][j]=0;
    }  
    if(e==2)
    { a[k][m]=2;
      a[i][j]=0;
    }
  }
  if(d==1)
  { if(strcmp(s,"dl")==0)
    { k=i+1;
      m=j-1; }
    if(strcmp(s,"sd")==0)
    { k=i+1;
      m=j; }
    if(strcmp(s,"dr")==0)
    { k=i+1;
      m=j+1; }
    swap(k,m,1);
   }
  if(d==2)
  { if(strcmp(s,"ul")==0)
    { k=i-1;
      m=j-1; }
    if(strcmp(s,"su")==0)
    { k=i-1;
      m=j; }
    if(strcmp(s,"ur")==0)
    { k=i-1;
      m=j+1; }
    swap(k,m,2);
   }
 }

 void move_displayer(int a[][size],int n,int d)
{ int i,j,z=0,c=0;
  int temp[n][size],t[n][size];
   for(i=0;i<n;i++)
    { for(j=0;j<n;j++)
      { temp[i][j]=a[i][j];
        t[i][j]=temp[i][j];
      }
    }
  int k,m;
  char ch[3]={'-','w','b'};

  void display(int t[][size],int n)
   { int g,h;
     printf("  ");
     printf("{");
     printf("   ");
      for(g=0;g<n;g++)
      {printf("[");
       printf(" ");
       for(h=0;h<n;h++)
       { printf("%c",ch[t[g][h]]);
         printf(" ");
       }
       printf("]");
       printf("   ");
      }
     printf("}\n");
   }

   if(d==1)
   { for(i=0;i<n;i++)
    { for(j=0;j<n;j++)
      { if(temp[i][j]==1)
        { if(j==0 && temp[i+1][j]==0)
           { k=i+1;
             m=j;
             t[i][j]=0;
             t[k][m]=1;
             display(t,n);
             t[i][j]=1;
             t[k][m]=0;
           }
          if(j==0 && temp[i+1][j+1]==2)
           { k=i+1;
             m=j+1;
             t[i][j]=0;
             t[k][m]=1;
             display(t,n);
             t[i][j]=1;
             t[k][m]=2;
           }
          if(j==n-1 && temp[i+1][j]==0)
           { k=i+1;
             m=j;
             t[i][j]=0;
             t[k][m]=1;
             display(t,n);
             t[i][j]=1;
             t[k][m]=0;
           }
          if(j==n-1 && temp[i+1][j-1]==2)
           { k=i+1;
             m=j-1;
             t[i][j]=0;
             t[k][m]=1;
             display(t,n);
             t[i][j]=1;
             t[k][m]=2;
           }
          if((j>0 && j<n-1) && temp[i+1][j]==0)
            { k=i+1;
              m=j;
              t[i][j]=0;
              t[k][m]=1;
              display(t,n);
              t[i][j]=1;
              t[k][m]=0;
            }
          if((j>0 && j<n-1) && temp[i+1][j-1]==2)
            { k=i+1;
              m=j-1;
              t[i][j]=0;
              t[k][m]=1;
              display(t,n);
              t[i][j]=1;
              t[k][m]=2;
            }
          if((j>0 && j<n-1) && temp[i+1][j+1]==2)
            { k=i+1;
              m=j+1;
              t[i][j]=0;
              t[k][m]=1;
              display(t,n);
              t[i][j]=1;
              t[k][m]=2;
            }
          } 
       }
     }
   }
   
     if(d==2)
   { for(i=0;i<n;i++)
    { for(j=0;j<n;j++)
      { if(temp[i][j]==2)
        { if(j==0 && temp[i-1][j]==0)
           { k=i-1;
             m=j;
             t[i][j]=0;
             t[k][m]=2;
             display(t,n);
             t[i][j]=2;
             t[k][m]=0;
           }
          if(j==0 && temp[i-1][j+1]==1)
           { k=i-1;
             m=j+1;
             t[i][j]=0;
             t[k][m]=2;
             display(t,n);
             t[i][j]=2;
             t[k][m]=1;
           }
          if(j==n-1 && temp[i-1][j]==0)
           { k=i-1;
             m=j;
             t[i][j]=0;
             t[k][m]=2;
             display(t,n);
             t[i][j]=2;
             t[k][m]=0;
           }
          if(j==n-1 && temp[i-1][j-1]==1)
           { k=i-1;
             m=j-1;
             t[i][j]=0;
             t[k][m]=2;
             display(t,n);
             t[i][j]=2;
             t[k][m]=1;
           }
          if((j>0 && j<n-1) && temp[i-1][j]==0)
            { k=i-1;
              m=j;
              t[k][m]=2;
              t[i][j]=0;
              display(t,n);
              t[i][j]=2;
              t[k][m]=0;
            }
          if((j>0 && j<n-1) && temp[i-1][j-1]==1)
            { k=i-1;
              m=j-1;
              t[i][j]=0;
              t[k][m]=2;
              display(t,n);
              t[i][j]=2;
              t[k][m]=1;
            }
          if((j>0 && j<n-1) && temp[i-1][j+1]==1)
            { k=i-1;
              m=j+1;
              t[i][j]=0;
              t[k][m]=2;
              display(t,n);
              t[i][j]=2;
              t[k][m]=1;
            }
         }
       }
     }
    }
 } 
   
void main()
{ int n,i,j,k,m;
  int x=5,y=5;
  char s[3]; 
  char ch[3]={'-','w','b'};
  printf("Enter n for the chess of the form n*n:");
  scanf("%d",&n);
  size=n;
  int arr[n][n]; 
  printf("White Player,\n1. downward left-dl\n2. straight down-sd\n3. downward right-dr");
  printf("\nBlack Player,\n1. upward left-ul\n2. straight up-su\n3. upward right-ur\n");
  printf("Board:\n");
  for(i=0;i<n;i++)
   {for(j=0;j<n;j++)
     {if(i==0)
      { arr[i][j]=1;
        printf("%c",ch[arr[i][j]]);
        printf(" ");
      }
      else if(i==(n-1))
      { arr[i][j]=2;
        printf("%c",ch[arr[i][j]]);
        printf(" ");
      }
      else
      { arr[i][j]=0;
        printf("%c",ch[arr[i][j]]);
        printf(" ");
      }
     }
    printf("\n");
   }
   
    do
   {
   printf("For White Player,");
   printf("Possible moves:\n");
   move_displayer(arr,n,1);
   while(1)
   {
    printf("Select the pawn to be moved in the form of R,C:");
    scanf("%d%d",&i,&j);
    if(arr[i][j]==1)
    {k=i;
     m=j;
     break;
    }
    printf("Position entered is wrong, again ");
   }
   while(1)
   {
    printf("Where do you want to put your pawn:");
    scanf("%s",s);
     if(strcmp(s,"dl")==0 && m!=0 && arr[k+1][m-1]==2)
       {break;}
     if(strcmp(s,"sd")==0 && arr[k+1][m]==0)
       {break;} 
     if(strcmp(s,"dr")==0 && m!=n-1 && arr[k+1][m+1]==2) 
       {break;}
    printf("Move selected is not possible, so ");
   } 
    move_maker(arr,n,i,j,s,1);
    display_board(arr,n);
    x=winning_condition(arr,n,1);

   if(x==0)
   {break;}

   printf("For Black Player,");
   printf("Possible moves:\n");
   move_displayer(arr,n,2);
   while(1)
   {
    printf("Select the pawn to be moved in the form of R,C:");
    scanf("%d%d",&i,&j);
    if(arr[i][j]==2)
    {k=i;
     m=j;
     break;
    }
    printf("Position entered is wrong, again ");
   }
   while(1)
   {
    printf("Where do you want to put your pawn:");
    scanf("%s",s);
     if(strcmp(s,"ur")==0 && m!=n-1 && arr[k-1][m+1]==1)
       {break;}
     if(strcmp(s,"su")==0 && arr[k-1][m]==0)
       {break;}
     if(strcmp(s,"ul")==0 && m!=0 && arr[k-1][m-1]==1)
       {break;}
    printf("Move selected is not possible, so ");
   }
   move_maker(arr,n,i,j,s,2);
   display_board(arr,n);
   y=winning_condition(arr,n,2);

   if(y==0)
   {break;}

   } while(1);

   if(x==0)
   printf("\n***White Player is the Winner***");
   if(y==0)
   printf("\n***Black Player is the Winner***");
}
